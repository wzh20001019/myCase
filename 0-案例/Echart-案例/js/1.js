window.addEventListener('load', function() {
    // 监控模块
    (function() {
        // let wrapBox = document.querySelector('.wrap_box'),
        let as = document.querySelectorAll('.m_box1 a'),
            taps = document.querySelectorAll('.m_box2 .tp');

        animate(taps[0]);

        function animate(tap) {
            clearInterval(tap.timer);
            let ulBox = tap.querySelector('.ul_box'),
                ul2 = ulBox.querySelector('.Module2');

            let num = 40; //滚动速度
            let off = -ul2.offsetTop;
            tap.timer = setInterval(function() {
                if (off >= ulBox.offsetTop) {
                    ulBox.style.top = 0;
                }
                ulBox.style.top = ulBox.offsetTop - 1 + 'px';
            }, num);

            ulBox.addEventListener('mouseenter', function() {
                clearInterval(tap.timer);
            });

            ulBox.addEventListener('mouseleave', function() {
                clearInterval(tap.timer);
                tap.timer = setInterval(function() {
                    if (off >= ulBox.offsetTop) {
                        ulBox.style.top = 0;
                    }
                    ulBox.style.top = ulBox.offsetTop - 1 + 'px';
                }, num)
            })
        };

        as[0].onclick = function() {
            if (!this.className) {
                this.classList.add('select');
                as[1].classList.remove('select');
                taps[0].style.display = 'block';
                taps[1].style.display = 'none';
                animate(taps[0]);
            }
        }

        as[1].onclick = function() {
            if (!this.className) {
                this.classList.add('select');
                as[0].classList.remove('select');
                taps[0].style.display = 'none';
                taps[1].style.display = 'block';
                animate(taps[1]);
            }
        }
    })();

    //点位分布模块
    (function() {
        let myChart = echarts.init(document.querySelector('.one_box'));

        let option = {
            color: ['#006cff', '#60cda0', '#9E12D6', '#52068B', '#0096ff', '#0DE0DB', '#0F9CCD', '#1d9dff'],
            series: [{
                name: '点位统计',
                type: 'pie',
                radius: ['15%', '87%'],
                center: ['50%', '50%'],
                roseType: 'radius',
                itemStyle: {
                    borderRadius: 3
                },
                label: {
                    fontSize: 10
                },
                labelLine: {
                    length: 4,
                    length2: 6,
                },
                data: [
                    { value: 20, name: '黄冈' },
                    { value: 26, name: '武汉' },
                    { value: 24, name: '孝感' },
                    { value: 25, name: '黄石' },
                    { value: 20, name: '随州' },
                    { value: 25, name: '恩施' },
                    { value: 30, name: '咸宁' },
                    { value: 35, name: '荆州' }
                ],
            }],
        };

        myChart.setOption(option);
    })();

    //用户统计模块
    (function() {
        let myChart = echarts.init(document.querySelector('.special'));
        let item = {
            name: '',
            value: 1200,
            itemStyle: {
                color: '#254065',
            },
            emphasis: {
                itemStyle: {
                    color: '#254065',
                }
            },
            tooltip: {
                extraCssText: 'opacity: 0'
            }
        };

        let option = {
            tooltip: {
                trigger: 'item',
            },
            grid: {
                top: '5%',
                left: '0%',
                right: '0%',
                bottom: '0%',
                containLabel: true,
                show: true,
                borderColor: 'rgba(0, 240, 255, .3)'
            },
            xAxis: [{
                type: 'category',
                data: ['北京', '上海', '深圳', '武汉', '南京', '', '......', '', '厦门', '香港', '澳门', '长沙', '天津'],
                axisTick: {
                    alignWithLabel: false,
                    show: false
                },
                axisLabel: {
                    color: '#4c9bfd',
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, .3)'
                    }
                }
            }],
            yAxis: [{
                show: true,
                type: 'value',
                axisTick: {
                    alignWithLabel: false,
                    show: false
                },
                axisLabel: {
                    color: '#4c9bfd',
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, .3)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, .3)'
                    }
                }
            }],
            color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1, [
                    { offset: 0, color: '#00fffb' },
                    { offset: 1, color: '#0061ce' }
                ]
            ),
            series: [{
                name: '用户总量',
                type: 'bar',
                barWidth: '60%',
                data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240]
            }]
        };
        myChart.setOption(option);
    })();

    //订单量模块
    (function() {
        let as = document.querySelectorAll('.order .or_box1 a'),
            sts = document.querySelectorAll('.order .or_box2 .information');

        as.forEach(function(item, index) {
            item.onclick = function() {
                as.forEach(function(val, i) {
                    val.className = '';
                    sts[i].style.display = 'none';
                });
                this.className = 'white';
                sts[index].style.display = 'block';
            }
        });
    })();

    //销售额统计模块
    (function() {
        let data = {
            year: [
                [24, 40, 81, 94, 80, 46, 100, 45, 95, 78, 94, 67],
                [40, 64, 99, 23, 100, 45, 63, 90, 87, 98, 34, 90]
            ],
            quarter: [
                [23, 75, 12, 97, 21, 67, 98, 27, 43, 64, 76, 38],
                [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
            ],
            month: [
                [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
                [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
            ],
            week: [
                [43, 73, 62, 54, 91, 54, 84, 43, 78, 43, 54, 53],
                [32, 54, 34, 87, 32, 45, 63, 68, 93, 78, 57, 45]
            ]
        }
        let myChart = echarts.init(document.querySelector('.sales .data'));
        let option = {
            title: {
                padding: [0, 0, 0, 40],
                subtext: '单位:万',
                subtextStyle: {
                    color: 'rgba(0, 240, 255, .3)'
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                right: '10%',
                textStyle: {
                    color: '#4c9bfd',
                },
                data: ['预期销售额', '实际销售额']
            },
            grid: {
                top: '20%',
                left: '0%',
                right: '1%',
                bottom: '1%',
                show: true,
                borderColor: '#012f4a',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    fontWeight: 100,
                    fontSize: 8,
                    color: '#4c9bfd',
                },
                boundaryGap: false,
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            },
            yAxis: {
                type: 'value',
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    fontWeight: 100,
                    fontSize: 8,
                    color: '#4c9bfd',
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, .3)'
                    }
                }
            },
            color: ['#00f2f1', '#ed3f35'],
            series: [{
                    name: '预期销售额',
                    type: 'line',
                    smooth: true,
                    data: [24, 40, 81, 94, 80, 46, 100, 45, 95, 78, 94, 67]
                },
                {
                    name: '实际销售额',
                    type: 'line',
                    smooth: true,
                    data: [40, 64, 99, 23, 100, 45, 63, 90, 87, 98, 34, 90]
                }
            ]
        };
        myChart.setOption(option);

        let as = document.querySelectorAll('.sales .title a');
        let st = document.querySelector('.sales .inr');
        as.forEach(function(item, i) {
            item.onclick = function() {
                as.forEach(function(val) {
                    val.className = '';
                });
                index = i;
                this.className = 'bg_color';
                let dt = this.dataset.id;
                option.series[0].data = data[dt][0];
                option.series[1].data = data[dt][1];
                myChart.setOption(option);
            }
        });

        let index = 0;
        let timer = setInterval(function() {
            index++;
            if (index > 3) {
                index = 0;
            }
            as[index].onclick();
        }, 2000);

        st.addEventListener('mouseenter', function() {
            clearInterval(timer);
        });

        st.addEventListener('mouseleave', function() {
            timer = setInterval(function() {
                index++;
                if (index > 3) {
                    index = 0;
                }
                as[index].onclick();
            }, 2000);
        });
    })();
});