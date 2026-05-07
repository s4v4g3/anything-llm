#!/bin/bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd $SCRIPT_DIR
set -e

while [[ $# -gt 0 ]]; do
  case $1 in
    -c|--clean)
      CLEAN=true
      shift 1
      ;;
    -l|--local)
      LOCAL_OPENAPI=true
      shift 1
      ;;
    *)
      POSITIONAL_ARGS+=("$1") # Catch-all for non-flag arguments
      shift 1
      ;;
  esac
done

if [ -z "${POSITIONAL_ARGS[0]}" ]; then
  echo "Usage: $0 package-version -c|--clean -l|--local"
  echo "No package version specified. Please provide a version for the generated package."

  exit 1
fi

PACKAGE_VERSION=${POSITIONAL_ARGS[0]}
GENERATOR_VERSION=7.15.0
JAR_FILE=openapi-generator-cli-$GENERATOR_VERSION.jar

if [ ! -f $JAR_FILE ]; then
    curl -k --fail -o $JAR_FILE https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/$GENERATOR_VERSION/$JAR_FILE
fi
PACKAGES=(anythingllm_client anythingllm_client_asyncio)
OPENAPI_URL=$SCRIPT_DIR/../../../server/swagger/openapi.json
if [ "$LOCAL_OPENAPI" == "true" ]; then
  # this doesn't work...
  OPENAPI_URL=http://127.0.0.1:3001/api/docs/openapi.json
fi

# NOTE: due to https://github.com/openapitools/openapi-generator/issues/21084 we need to patch the
# schema before running the generator.
# Patching is done inside the download_schema.py script
#SCHEMA_BASE_URL=https://val-station-manager.silabs.net
#if [ "$2" == "local" ]; then
#  SCHEMA_BASE_URL=http://127.0.0.1:3001
#fi
#python download_schema.py $SCHEMA_BASE_URL

for PACKAGE in "${PACKAGES[@]}"; do
  LIBRARY="urllib3"
  if [[ "$PACKAGE" =~ .*asyncio ]]; then
    LIBRARY="asyncio"
  fi
  if [ "$CLEAN" == "true" ]; then
    rm -rf $PACKAGE
  fi
  java -jar $JAR_FILE generate -i $OPENAPI_URL -g python-pydantic-v1 --additional-properties=library=$LIBRARY,packageName=$PACKAGE,projectName=$PACKAGE,packageVersion=$PACKAGE_VERSION -o $PACKAGE -t custom_template
  pushd $PACKAGE
  ruff format
  ruff check --fix --unsafe-fixes
  ruff format
  ruff check --fix --unsafe-fixes
  popd
done



