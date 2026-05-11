#!groovy

def registry_server = "registry.savage.zone"
def registry_push_host = "registry-push.savage.zone"
def registry_url = "https://" + registry_push_host
def imageRepository = "anything-llm"

@Library('pipeline_shared_libraries') _

pipeline {
    agent none
    options {
        disableConcurrentBuilds()
        timeout(time: 65, unit: 'MINUTES')
    }
    stages {
        stage('Image Build') {
            when {
                anyOf {
                    branch 'devmain'
                }
                beforeAgent true
            }
            agent {
                label 'Docker_Linux'
            }
            environment {
                GIT_HASH = GIT_COMMIT.take(10)
            }
            steps {
                script {
                    def imageBuildName = registry_push_host + "/" + imageRepository + ":latest"
                    def taggedImageName = registry_server + "/" + imageRepository + ":" + env.GIT_HASH
                    // check if tag already exists
                    def status = sh returnStatus: true, script: "curl --fail https://${registry_server}/v2/${imageRepository}/manifests/${env.GIT_HASH}"
                    if (status == 0) {
                        echo "Image with tag ${env.GIT_HASH} already exists"
                    } else if (status == 22) {
                        // image does not exist
                        def image = docker.build(imageBuildName, "-f docker/Dockerfile --progress plain .")
                        docker.withRegistry(registry_url, 'jenkins-automation-nexus-credentials') {
                            image.push('latest')
                            image.push(env.GIT_HASH)
                        }
                    } else {
                        error 'Unexpected error code from curl'
                    }
                    currentBuild.displayName = currentBuild.displayName + ": " + env.GIT_HASH
                    currentBuild.description = taggedImageName
                }
            }
        }
    }
    post {
        always {
            updateHomeAssistantAlertEntity currentBuild.result
        }
    }
}
