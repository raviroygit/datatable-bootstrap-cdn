
$(document).ready(function () {

    var table;

    function destroyTable() {
        $('#dt-basic-checkbox2').dataTable().fnDestroy();
    };

    const dataList = async (url) => {

        document.getElementById('loading').style.display = "block";

        await fetch(baseUrl + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': apiKey,
                "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
                'Access-Control-Allow-Origin': ""
            }
        }).then(res => {
            res.json().then(resData => {
                document.getElementById('loading').style.display = "none";
                if (resData && resData.length > 0) {
                    destroyTable();
                    renderDataInTheTable(resData);
                }
            })
        }).catch(err => {
            console.log("Api failed", err);
        });

    };

    if (localStorage.getItem('tinyId')) {
        dataList(`/alerts/${localStorage.getItem('tinyId')}/logs?identifierType=tiny&sort=createdAt&order=desc`);
        setInterval(() => {
            console.log('datatable tiny ')
            dataList(`/alerts/${localStorage.getItem('tinyId')}/logs?identifierType=tiny&sort=createdAt&order=desc`);
        }, autoRefreshInterval);
    };


    function renderDataInTheTable(data) {
        if (data.length > 0) {
            table = $('#dt-basic-checkbox2')
                .DataTable({
                    "searching": true,
                    "ordering": false,
                    pageLength: 10,
                    destroy: true,
                    language: {
                        paginate: {
                            next: 'Next <img src="./img/next.png" style="height:20px;width:20px;"/>',
                            previous: '<img src="./img/previous.png" style="height:20px;width:20px;"/> Previous',
                        },
                    },
                    data: data,
                    lengthMenu: [
                        [10, 25, 50, 75, 100],
                        [10, 25, 50, 75, 100],
                    ],
                    columns: [
                        {
                            id: 1, data: "createdAt",
                            "type": "date ",
                            "render": function (date) {
                                return new Date(date).toISOString().
                                    replace(/T/, ' ').
                                    replace(/\..+/, '')
                            }
                        },
                        { id: 5, data: "type" },
                        { id: 6, data: "offset" },
                        { id: 7, data: "owner" },
                        { id: 8, data: "log" }

                    ],
                    select: 'single',
                    responsive: true,
                });

        };
    };
});

