#!/bin/bash
cd `dirname $0`

if [ -f .installed ]
  then
    source viam-env/bin/activate
  else
    python3 -m pip install --user virtualenv
    python3 -m venv viam-env
    source viam-env/bin/activate
    pip3 install --upgrade -r requirements.txt
    if [ $? -eq 0 ]
      then
        touch .installed
    fi
fi

# Be sure to use `exec` so that termination signals reach the python process,
# or handle forwarding termination signals manually
exec python3 -m src $@