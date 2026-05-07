#!/bin/bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd $SCRIPT_DIR
set -e

GENERATOR_VERSION=7.15.0
JAR_FILE=openapi-generator-cli-$GENERATOR_VERSION.jar

if [ ! -f $JAR_FILE ]; then
    curl -k --fail -o $JAR_FILE https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/$GENERATOR_VERSION/$JAR_FILE
fi


rm -rf custom_template
java -jar $JAR_FILE author template -g python-pydantic-v1 -o custom_template