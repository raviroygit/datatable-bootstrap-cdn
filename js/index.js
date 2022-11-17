
$(document).ready(async function () {

    if (!window.location.href.includes('log.html')) {
        await localStorage.removeItem('tinyId');
    }
    var table;

    function destroyTable() {
        $('#dt-basic-checkbox1').dataTable().fnDestroy()
    };


    const dataList = async (url, customLimit) => {

        document.getElementById('loading').style.display = "block";
        let apiUrl;

        if (customLimit && !localStorage.getItem('tinyId')) {
            apiUrl = apiUrl = baseUrl + '/alerts?sort=createdAt&' + `limit=${customLimit}`
        } else if (url && !customLimit) {
            apiUrl = baseUrl + url;
        }
        else if (!customLimit && !url) {
            apiUrl = apiUrl = baseUrl + url
        }


        await fetch(apiUrl, {
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

    dataList('/alerts?sort=createdAt&');

    // method for auto refresh
    
    setInterval(() => {
        console.log('datatable refreshed ')
        dataList('/alerts?sort=createdAt&');
    }, autoRefreshInterval);

    function renderDataInTheTable(data) {
        if (data.length > 0) {
            table = $('#dt-basic-checkbox1')
                .DataTable({
                    "searching": true,
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
                        {
                            id: 2, data: "updatedAt",
                            "type": "date ",
                            "render": function (value) {
                                return new Date(value).toISOString().
                                    replace(/T/, ' ').
                                    replace(/\..+/, '')
                            }
                        },
                        {
                            id: 3, data: "lastOccurredAt",
                            "type": "date ",
                            "render": function (value) {
                                return new Date(value).toISOString().
                                    replace(/T/, ' ').
                                    replace(/\..+/, '')
                            }
                        },
                        { id: 4, data: "message" },
                        { id: 5, data: "priority" },
                        { id: 6, data: "seen" },
                        { id: 7, data: "status" },
                        { id: 8, data: "acknowledged" },
                        { id: 9, data: "snoozed" },
                    ],
                    select: 'single',
                    responsive: true,

                });

            table.on('click', 'td', function (e) {
                location.href = '/logs.html';
                localStorage.setItem('tinyId', table.row(this).data().tinyId);
            });
        };
    };
});

