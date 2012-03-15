The app will start an UDP-server, which listens for packages with the format "<key>;<value>".
It creates buckets for every `key` and stores all if it's received values. On every request, the server will check if there are buckets, which have been idle for a specific time (currently 30 seconds). Furthermore it checks, if the bucket has more than a specified amount (default 100) of values and if the bucket was alive longer than it's ttl (default 30 minutes). Every restriction can be edited in the `bucket.js`. If one of those restrictions match, the bucket will be serialized into a logfile. There will be one logfile for every hour inside the `logs`-folder, so every expired bucket will be appended to that file. The format of the serialization is:

    <current timestamp>;<key>;<value1>;<value2>;...;<valueX>\n

Run the script via:

    npm install
    node app.js

Run the tests via:

    npm test

Send the server some data:

    echo -n "key;value" | netcat -u -c localhost 2323
