function __rest(m, u) {
    const regx = /^(https?):\/\/([a-zA-Z0-9.-]*)(:+[0-9]+)(\/?.+)$/;
    let parts = u.match(regx);

    console.info(u, parts);
    let http = require(parts[1]);
    let headers = {};
    let query = {};

    function qs (){
        let str;
        for (let idx in query) {
            if (!str) {
                str = "?" + idx + "=" + escape(query[idx])
            }    else {
                str += "&" + idx + "=" + escape(query[idx])
            }
        }
        return str;
    }

    return {


        query: (obj) => {
            query = obj;
        },
        headers: (obj) => {
            headers = obj;
        },
        end: (cb) => {
            let out = { text: ""}
            let options = {
                "method": m.toUpperCase(),
                "hostname": parts[2],
                "port": parts[4],
                "path": parts[5] + qs(),
                "headers": headers
            };

            const req = http.request(options, res => {
                res.on("data", d => out.text += d);
                res.on("end", ()=>{ cb(out) });
            })

            req.on("error", e => { out.error = e; cb(out)});
            req.end();
        }
    }
}

module.exports = {
    get: url => {return __rest("get", url)},
    post: url => {return __rest("post", url)},
}