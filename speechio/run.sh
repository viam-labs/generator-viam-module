#!/bin/sh
cd `dirname $0`

pip install -r requirements.txt

# Be sure to use `exec` so that termination signals reach the python process,
# or handle forwarding termination signals manually
exec python3 -m src.main $@