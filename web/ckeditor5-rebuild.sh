#!/bin/bash

cd ckeditor5/ && yarn build && cd ../
yarn remove ckeditor5-custom-build && yarn add file:./ckeditor5