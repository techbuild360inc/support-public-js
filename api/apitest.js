const fetch = (...args) =>
    import ('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = async(req, res) => {
    var baseInternalURL = "https://jsonplaceholder.typicode.com/todos";
    if (req.method == "GET") {
        await fetch('https://jsonplaceholder.typicode.com/todos/${req.body.id}')
            .then((resp) => {
                apiResp = resp.text()
                res.status(200).json({ apiResp });
            })
    } else if (req.method == "POST") {
        const requestBody = req.body;
        res.status(200).json(await handlerNew(baseInternalURL, req, res));
    } else {
        res.status(404).json({ status: "Bad Request" });
    }
};

async function handlerNew(baseInternalURL, request, response) {
    console.log('++request', request);
    const requestBody = req.body;
    const res = await fetch(baseInternalURL, {
        method: 'POST',
        body: JSON.stringify({
            "title": "foo",
            "body": "bar",
            "userId": requestBody
        }),

    });
    const data = await res.text();
    return JSON.parse(data);
}