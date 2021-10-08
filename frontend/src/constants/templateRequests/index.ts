import { EMZ_BACKEND_APP_URI } from '@lib/constants'

export enum RequestLanguage {
  NODEJS = `Nodejs`,
  PYTHON = `Python`,
  PHP = `Php`,
  GO = `Go`,
  CURL = `Curl`,
}

export const CurlRequest = `
curl '${EMZ_BACKEND_APP_URI}/graphql' -X POST -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:92.0) Gecko/20100101 Firefox/92.0' -H 'Accept: */*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: ${EMZ_BACKEND_APP_URI}/graphql' -H 'content-type: application/json' -H 'authorization: bearer {{accessToken}}' -H 'Origin: ${EMZ_BACKEND_APP_URI}' -H 'Connection: keep-alive' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: same-origin' --data-raw '{"variables": {{videoReqVariables}}, "query": "mutation GqlMVideo($magicTemplate: MagicTemplateInputDto $orgId: Uuid! $public: Boolean $purpose: EmeezoVideoPurpose! $slug: String $template: EmzVideoTemplateInputDto $title: String ) { video( magicTemplate: $magicTemplate orgId: $orgId public: $public purpose: $purpose slug: $slug template: $template title: $title ) { _id createdAt errorMessage fileStorageFile { _id createdAt fileMediaId media { _id createdAt files { data { ... on MediaFileAudioMimeDataDto { duration type } ... on MediaFileImageMimeDataDto { aspectRatio height type width } ... on MediaFileVideoMimeDataDto { aspectRatio bitRate codecName duration height type width } } fileName mimeType original s3SignedUrl size } name orgId public state totalSize type updatedAt userId } mediaType name orgId parentFileStorageId public readonly totalSize updatedAt userId } fileStorageFileId magicTemplate { _id audio { file { ... on MagicTemplateSourceFileUri { type url } ... on MagicTemplateSourceMedia { mediaId type } } loopAudio outputVolume } clips { ... on MagicTemplateClipCanvas { _id background duration objects type } ... on MagicTemplateClipSimple { _id background duration type } } createdAt fps height updatedAt width } orgId public purpose slug status template { _id title variables { jsonSchema uiSchema } version } title updatedAt user { email firstName id lastName status } userId } }"}'
`

export const NodeJsRequest = `
const videoReqVariables = {{videoReqVariables}}

fetch('${EMZ_BACKEND_APP_URI}/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Connection': 'keep-alive',
        'Authorization': 'Bearer {{accessToken}}'
    },
    body: JSON.stringify({"query":"mutation GqlMVideo($magicTemplate: MagicTemplateInputDto $orgId: Uuid! $public: Boolean $purpose: EmeezoVideoPurpose! $slug: String $template: EmzVideoTemplateInputDto $title: String ) { video( magicTemplate: $magicTemplate orgId: $orgId public: $public purpose: $purpose slug: $slug template: $template title: $title ) { _id createdAt errorMessage fileStorageFile { _id createdAt fileMediaId media { _id createdAt files { data { ... on MediaFileAudioMimeDataDto { duration type } ... on MediaFileImageMimeDataDto { aspectRatio height type width } ... on MediaFileVideoMimeDataDto { aspectRatio bitRate codecName duration height type width } } fileName mimeType original s3SignedUrl size } name orgId public state totalSize type updatedAt userId } mediaType name orgId parentFileStorageId public readonly totalSize updatedAt userId } fileStorageFileId magicTemplate { _id audio { file { ... on MagicTemplateSourceFileUri { type url } ... on MagicTemplateSourceMedia { mediaId type } } loopAudio outputVolume } clips { ... on MagicTemplateClipCanvas { _id background duration objects type } ... on MagicTemplateClipSimple { _id background duration type } } createdAt fps height updatedAt width } orgId public purpose slug status template { _id title variables { jsonSchema uiSchema } version } title updatedAt user { email firstName id lastName status } userId } }","variables": videoReqVariables})
});    
`

export const PhpRequest = `
<?php
include('vendor/rmccue/requests/library/Requests.php');

$videoReqVariables = {{videoReqVariables}};

Requests::register_autoloader();
$headers = array(
    'content-type' => 'application/json',
    'Authorization' => 'bearer {{accessToken}}',
    'Connection' => 'keep-alive'
);
$data = '{"variables": $videoReqVariables, "query": "mutation GqlMVideo($magicTemplate: MagicTemplateInputDto $orgId: Uuid! $public: Boolean $purpose: EmeezoVideoPurpose! $slug: String $template: EmzVideoTemplateInputDto $title: String ) { video( magicTemplate: $magicTemplate orgId: $orgId public: $public purpose: $purpose slug: $slug template: $template title: $title ) { _id createdAt errorMessage fileStorageFile { _id createdAt fileMediaId media { _id createdAt files { data { ... on MediaFileAudioMimeDataDto { duration type } ... on MediaFileImageMimeDataDto { aspectRatio height type width } ... on MediaFileVideoMimeDataDto { aspectRatio bitRate codecName duration height type width } } fileName mimeType original s3SignedUrl size } name orgId public state totalSize type updatedAt userId } mediaType name orgId parentFileStorageId public readonly totalSize updatedAt userId } fileStorageFileId magicTemplate { _id audio { file { ... on MagicTemplateSourceFileUri { type url } ... on MagicTemplateSourceMedia { mediaId type } } loopAudio outputVolume } clips { ... on MagicTemplateClipCanvas { _id background duration objects type } ... on MagicTemplateClipSimple { _id background duration type } } createdAt fps height updatedAt width } orgId public purpose slug status template { _id title variables { jsonSchema uiSchema } version } title updatedAt user { email firstName id lastName status } userId } }"}';
$response = Requests::post('${EMZ_BACKEND_APP_URI}/graphql', $headers, $data);
`
export const PythonRequest = `
import requests

videoReqVariables = {{videoReqVariables}}

headers = {
    'content-type': 'application/json',
    'authorization': 'bearer {{accessToken}}',
    'Connection': 'keep-alive',
}

data = '{"variables": videoReqVariables, "query": "mutation GqlMVideo($magicTemplate: MagicTemplateInputDto $orgId: Uuid! $public: Boolean $purpose: EmeezoVideoPurpose! $slug: String $template: EmzVideoTemplateInputDto $title: String ) { video( magicTemplate: $magicTemplate orgId: $orgId public: $public purpose: $purpose slug: $slug template: $template title: $title ) { _id createdAt errorMessage fileStorageFile { _id createdAt fileMediaId media { _id createdAt files { data { ... on MediaFileAudioMimeDataDto { duration type } ... on MediaFileImageMimeDataDto { aspectRatio height type width } ... on MediaFileVideoMimeDataDto { aspectRatio bitRate codecName duration height type width } } fileName mimeType original s3SignedUrl size } name orgId public state totalSize type updatedAt userId } mediaType name orgId parentFileStorageId public readonly totalSize updatedAt userId } fileStorageFileId magicTemplate { _id audio { file { ... on MagicTemplateSourceFileUri { type url } ... on MagicTemplateSourceMedia { mediaId type } } loopAudio outputVolume } clips { ... on MagicTemplateClipCanvas { _id background duration objects type } ... on MagicTemplateClipSimple { _id background duration type } } createdAt fps height updatedAt width } orgId public purpose slug status template { _id title variables { jsonSchema uiSchema } version } title updatedAt user { email firstName id lastName status } userId } }"}'

response = requests.post('${EMZ_BACKEND_APP_URI}/graphql', headers=headers, data=data)
`

export const GoRequest = `
package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

func main() {
    videoReqVariables := {{videoReqVariables}}
	client := &http.Client{}
	data := strings.NewReader('{"variables": videoReqVariables, "query": "mutation GqlMVideo($magicTemplate: MagicTemplateInputDto $orgId: Uuid! $public: Boolean $purpose: EmeezoVideoPurpose! $slug: String $template: EmzVideoTemplateInputDto $title: String ) { video( magicTemplate: $magicTemplate orgId: $orgId public: $public purpose: $purpose slug: $slug template: $template title: $title ) { _id createdAt errorMessage fileStorageFile { _id createdAt fileMediaId media { _id createdAt files { data { ... on MediaFileAudioMimeDataDto { duration type } ... on MediaFileImageMimeDataDto { aspectRatio height type width } ... on MediaFileVideoMimeDataDto { aspectRatio bitRate codecName duration height type width } } fileName mimeType original s3SignedUrl size } name orgId public state totalSize type updatedAt userId } mediaType name orgId parentFileStorageId public readonly totalSize updatedAt userId } fileStorageFileId magicTemplate { _id audio { file { ... on MagicTemplateSourceFileUri { type url } ... on MagicTemplateSourceMedia { mediaId type } } loopAudio outputVolume } clips { ... on MagicTemplateClipCanvas { _id background duration objects type } ... on MagicTemplateClipSimple { _id background duration type } } createdAt fps height updatedAt width } orgId public purpose slug status template { _id title variables { jsonSchema uiSchema } version } title updatedAt user { email firstName id lastName status } userId } }"}')
	req, err := http.NewRequest("POST", "${EMZ_BACKEND_APP_URI}/graphql", data)
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Set("content-type", "application/json")
	req.Header.Set("authorization", "bearer {{accessToken}}")
	req.Header.Set("Connection", "keep-alive")
	
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()
	bodyText, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%s\n", bodyText)
}
`
