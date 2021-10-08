#!/bin/bash

# Variables
apollo_tools_schema_dir_name="schema.json"
apollo_tools_types_dir_name="__generated__"
service_export_prefix="GQL_"

apollo_tools_schema_output_default_dir="libs/gqlTypes"
apollo_tools_config_default_dir="src/config/apollo/tools-configs"
apollo_tools_schema_output_dir=${APOLLO_TOOLS_SCHEMA_OUTPUT_DIR:-$apollo_tools_schema_output_default_dir}
apollo_tools_config_dir=${APOLLO_TOOLS_CONFIG_DIR:-$apollo_tools_config_default_dir}

apollo_gql_types_file="$apollo_tools_schema_output_default_dir/index.ts"

# Delete the graphql type file
# rm -f $apollo_gql_types_file # Turned off because conflicts may occur (TODO)

addGqlTypes()
{
  service_name="$1"
  service_dir="$2"
  schema_generated_dir=$service_dir/$apollo_tools_types_dir_name
  service_gql_type_file="$service_dir/index.ts"

  # Removing service gql file
  rm -f $service_gql_type_file

  for gql_type_file in "$schema_generated_dir"/*
  do
    if grep -q "GraphqlScalarType" "$gql_type_file"; then
      sed -i "5i import * as GraphqlScalarType from '@lib/graphql/types'" $gql_type_file
    fi
    gql_type_file_name="$(basename "$gql_type_file" ".ts")"
    echo "export * from './$apollo_tools_types_dir_name/$gql_type_file_name'" >> $service_gql_type_file
  done

  # Linting service gql file
  npx eslint $service_gql_type_file --fix --quiet

  # Adding service export in gqlTypes
  # echo "export * from './$service_name'" >> $apollo_gql_types_file # Turned off because conflicts may occur (TODO)
}

for config_file in "$apollo_tools_config_dir"/*
do
  service_name="$(basename "$config_file" ".apollo.config.js")"
  service_dir=$apollo_tools_schema_output_dir/$service_name
  schema_graphql_dir=$service_dir/$apollo_tools_schema_dir_name
  schema_generated_dir=$service_dir/$apollo_tools_types_dir_name
  service_export_name="$service_export_prefix${service_name^^}"

  echo "Syncing $service_name ..."

  # Cleaing old schema
  rm -f $schema_graphql_dir
  rm -rf $schema_generated_dir

  # Downloading new schema
  npx apollo client:download-schema -c $config_file $schema_graphql_dir

  # Generating types
  npx apollo client:codegen -c $config_file $schema_generated_dir --namespace $service_export_name --target typescript --addTypename --outputFlat --tsFileExtension=ts --passthroughCustomScalars --customScalarsPrefix=GraphqlScalarType.
  
  addGqlTypes $service_name $service_dir
done



# Linting gql type file
# npx eslint $apollo_gql_types_file --fix --quiet # Turned off because conflicts may occur (TODO)