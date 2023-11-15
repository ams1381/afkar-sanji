import {digitsEnToFa} from "@persian-tools/persian-tools";
import {objectToSparseArray} from "@/components/Charts/QuestionChart";
import {generateRandomColors} from "@/components/Charts/QuestionChart";
const regex = /(<([^>]+)>)/gi;

export const ChartDataGenerator = (PlotDetail,currentSort,currentChartType,backgroundColors,borderColors) => {
    // console.log(backgr/oundColors)
    let data;
    // console.log(currentChartType)
    if(PlotDetail.options)
    {
        let dataArray =  Object.values(PlotDetail.counts).map((item,index) => [ PlotDetail.options[index].text  , item ])
        let SortArray = currentSort == 'increase' ? Object.values(PlotDetail.counts).sort((a,b) => a - b) :
            currentSort == 'decrease' ? Object.values(PlotDetail.counts).sort((a,b) => a - b).reverse() : ''

        if(currentSort != 'default')
            dataArray = dataArray.map(function(item) {
                var n = SortArray.indexOf(item[1]);
                SortArray[n] = '';
                return [n, item]
            }).sort().map(function(j) { return j[1] }).map(item => item[0])

        return data = {
            type : currentChartType == 'Line' ? 'line' : (currentChartType == 'Bar' ||  currentChartType == 'HorizontalBar') ? 'bar' :'pie',
            labels: Object.values(PlotDetail.counts).every(item => item == 0) ? [] :
                currentSort == 'default' ? PlotDetail.options?.map(item => item.text?.replace(regex,"")) :
                    dataArray.map(item => item.replace(regex,""))
            ,
            datasets: [
                {
                    data: PlotDetail.counts ?
                        currentSort == 'default' ?  Object.values(PlotDetail.counts) : currentSort == 'increase' ?
                            Object.values(PlotDetail.counts).sort((a,b) => a - b) : currentSort == 'decrease' ?
                                Object.values(PlotDetail.counts).sort((a,b) => a - b).reverse() : ''
                        : [],
                    // fill: true,
                    backgroundColor: backgroundColors ? backgroundColors : currentChartType != 'Line' ? generateRandomColors(PlotDetail.options?.length) : null ,
                    borderColor: (borderColors == 'transparent' && currentChartType == 'Line') ? generateRandomColors(1)
                        : currentChartType == 'Line' ? generateRandomColors(1) : 'transparent',
                    fontFamily : 'IRANSans',
                    yAxisID : 'y'
                },
            ],
            // plugins: [htmlLegendPlugin],
        };
    }
    else if(PlotDetail.question_type == 'integer_range' || PlotDetail.question_type == 'integer_selective')
    {

        let dataArray = objectToSparseArray(PlotDetail.counts , PlotDetail.max).map((item,index) => [ PlotDetail.min == 0 ? index : index + 1 , item ]);
        let SortArray = currentSort == 'increase' ? objectToSparseArray(PlotDetail.counts , PlotDetail.max).sort((a,b) => a - b) :
            currentSort == 'decrease' ? objectToSparseArray(PlotDetail.counts , PlotDetail.max).sort((a,b) => a - b).reverse() : ''

        if(currentSort != 'default')
        {
            dataArray = dataArray.map(function(item) {
                var n = SortArray.indexOf(item[1]);
                SortArray[n] = '';
                return [n, item]
            }).sort().map(function(j) { return j[1] }).map(item => item[0]);
        }
        return  data = {
            type : currentChartType == 'Line' ? 'line' : (currentChartType == 'Bar' ||  currentChartType == 'HorizontalBar') ? 'bar' :'pie',
            labels: (currentSort == 'default') ? Array.from({ length : PlotDetail.max }).map((_,index) =>
                    (PlotDetail.max == 0 ? index : index + 1)) :
                dataArray
            ,
            datasets: [
                {
                    data: currentSort == 'default' ? objectToSparseArray(PlotDetail.counts , PlotDetail.max) :
                        currentSort == 'increase' ? objectToSparseArray(PlotDetail.counts , PlotDetail.max).sort((a,b) => a - b) :
                            currentSort == 'decrease' ? objectToSparseArray(PlotDetail.counts , PlotDetail.max).sort((a,b) => a - b).reverse() : []
                    ,
                    // fill: true,
                    backgroundColor: backgroundColors ? backgroundColors : currentChartType != 'Line' ? generateRandomColors(PlotDetail.max) : null ,
                    borderColor: (borderColors == 'transparent' && currentChartType == 'Line') ? generateRandomColors(1)
                        : currentChartType == 'Line' ? generateRandomColors(1) : 'transparent',
                    fontFamily : 'IRANSans',
                    yAxisID : 'y'
                },
            ],
        };
    }
    else if(PlotDetail.question_type == 'number_answer')
    {
        let dataArray = Object.keys(PlotDetail.counts).map((item,index) => [ item , Object.values(PlotDetail.counts)[index] ]);
        let SortArray = currentSort == 'increase' ? Object.values(PlotDetail.counts).sort((a,b) => a - b) :
            currentSort == 'decrease' ? Object.values(PlotDetail.counts).sort((a,b) => a - b).reverse() : ''

        if(currentSort != 'default')
        {
            dataArray = dataArray.map(function(item) {
                var n = SortArray.indexOf(item[1]);
                SortArray[n] = '';
                return [n, item]
            }).sort().map(function(j) { return j[1] }).map(item => item[0]);
        }

        return  data = {
            type : currentChartType == 'Line' ? 'line' : (currentChartType == 'Bar' ||  currentChartType == 'HorizontalBar') ? 'bar' :'pie',
            labels: (currentSort == 'default') ? Object.keys(PlotDetail.counts).map((item,index) =>
                    digitsEnToFa(item)) :
                dataArray.map(item => digitsEnToFa(item))
            ,
            datasets: [
                {
                    data: Object.values(PlotDetail.counts).length == 1 ? [(Object.values(PlotDetail.counts)[0])]
                        : currentSort == 'default' ? Object.values(PlotDetail.counts).map(item => (item)) :
                            currentSort == 'increase' ? Object.values(PlotDetail.counts).map(item => (item)).sort((a,b) => a - b) :
                                currentSort == 'decrease' ? Object.values(PlotDetail.counts).map(item => (item)).sort((a,b) => a - b).reverse() : []
                    ,
                    // fill: true,
                    backgroundColor: backgroundColors ? backgroundColors :  currentChartType != 'Line' ? generateRandomColors(PlotDetail.max) : null ,
                    borderColor: (borderColors == 'transparent' && currentChartType == 'Line') ? generateRandomColors(1)
                        : currentChartType == 'Line' ? generateRandomColors(1) : 'transparent',
                    fontFamily : 'IRANSans',
                    yAxisID : 'y',

                },
            ],
        };
    }
}


export const ChartOptionGenerator = (indexAxis , currentChartType , PlotDetail , currentSort) => {
    return {
        // responsive: true,
        aspectRatio: 1,
        // maintainAspectRatio: false,
        indexAxis: indexAxis,
        plugins: {
            // htmlLegend: {
            //   // ID of the container to put the legend in
            //   containerID: 'legend-container',
            // },
            legend: {
                display:  currentChartType == 'Pie',
                // display : false,
                position: 'right',
                labels: {
                    color: "#666",
                    usePointStyle : true ,
                    font: {
                        family: "IRANSans" // Add your font here to change the font of your legend label
                    }
                },
            },
            tooltip: {
                display : false,
                cornerRadius : 2,
                titleFont : {
                    family : 'IRANSans'
                },
                bodyFont : {
                    family : 'IRANSans'
                },
                callbacks: {
                    label : (shit) => {
                        try
                        {
                            return  digitsEnToFa(shit.formattedValue.toString() + ' ' + shit.label)
                        }
                        catch(err)
                        {
                            console.log(err)
                        }
                    },
                    title : (TitleValue) => {
                        return digitsEnToFa(TitleValue[0].formattedValue)
                    }
                }
            },
        }  ,
        scales : {
            x : {
                display : currentChartType != 'Pie',

                title :
                    {
                        font : {
                            family : 'IRANSans'
                        },
                    },
                ticks : {
                    font : {
                        family : 'IRANSans'
                    },
                    callback: function(value, index, ticks) {
                        if(currentChartType != 'HorizontalBar')
                        {
                            if(PlotDetail.question_type == 'optional' ||
                                PlotDetail.question_type == 'drop_down')
                            {
                                let dataArray = PlotDetail.options.map((item,index) => [ item?.text , Object.values(PlotDetail.counts)[index] ]);
                                let SortArray = currentSort == 'increase' ? Object.values(PlotDetail.counts).sort((a,b) => a - b) :
                                    currentSort == 'decrease' ? Object.values(PlotDetail.counts).sort((a,b) => a - b).reverse() : ''

                                if(currentSort != 'default')
                                    dataArray = dataArray.map(function(item) {
                                        var n = SortArray.indexOf(item[1]);
                                        SortArray[n] = '';
                                        return [n, item]
                                    }).sort().map(function(j) { return j[1] })

                                if(currentSort != 'default' && dataArray[index][0])
                                    return digitsEnToFa(dataArray[index][0]?.replace(regex,""))
                                else
                                    return digitsEnToFa(PlotDetail.options[index]?.text?.replace(regex,""));
                            }

                            else
                            {

                                let dataArray = objectToSparseArray(PlotDetail.counts , PlotDetail.max).map((item,index) => [ PlotDetail.minimum_answer == 0 ? index : index + 1 , item ]);
                                let SortArray = currentSort == 'increase' ? Object.values(PlotDetail.counts).sort((a,b) => a - b) :
                                    currentSort == 'decrease' ? Object.values(PlotDetail.counts).sort((a,b) => a - b).reverse() : ''

                                if(currentSort != 'default')
                                    dataArray = dataArray.map(function(item) {
                                        var n = SortArray.indexOf(item[1]);
                                        SortArray[n] = '';
                                        return [n, item]
                                    }).sort().map(function(j) { return j[1] })

                                if(dataArray[index] && dataArray[index][0] && currentSort != 'default')
                                    return digitsEnToFa(dataArray[index][0]?.toString())
                                else
                                {
                                    if(PlotDetail.minimum_answer == 0)
                                        return digitsEnToFa(value)
                                    else
                                        return digitsEnToFa(value + 1)
                                }

                            }
                        }
                        else
                        {
                            return digitsEnToFa(value)
                            //  return digitsEnToFa(Object.values(PlotDetail.counts)[index][0]);
                        }
                    }
                }
            } ,
            y : {
                display : currentChartType != 'Pie',
                min : 0,
                ticks : {
                    font : {
                        family : 'IRANSans'
                    },
                    margin : 5,
                    callback: function(value, index, ticks) {
                        if(currentChartType != 'HorizontalBar')
                            return digitsEnToFa(value);
                        else
                        {
                            if(PlotDetail.question_type == 'optional' || PlotDetail.question_type == 'drop_down')
                            {
                                let dataArray = PlotDetail.options.map((item,index) => [ item?.text , Object.values(PlotDetail.counts)[index] ]);
                                let SortArray = currentSort == 'increase' ? Object.values(PlotDetail.counts).sort((a,b) => a - b) :
                                    currentSort == 'decrease' ? Object.values(PlotDetail.counts).sort((a,b) => a - b).reverse() : ''

                                if(currentSort != 'default')
                                    dataArray = dataArray.map(function(item) {
                                        var n = SortArray.indexOf(item[1]);
                                        SortArray[n] = '';
                                        return [n, item]
                                    }).sort().map(function(j) { return j[1] })



                                if(currentSort != 'default' && dataArray[index][0])
                                    return digitsEnToFa(dataArray[index][0]?.replace(regex,""))
                                else
                                    return digitsEnToFa(PlotDetail.options[index]?.text?.replace(regex,""))
                            }

                            else
                            {
                                let dataArray = objectToSparseArray(PlotDetail.counts , PlotDetail.max).map((item,index) => [ PlotDetail.min == 0 ? index : index + 1 , item ]);
                                let SortArray = currentSort == 'increase' ? dataArray.map(item => item[1]).sort((a,b) => a - b) :
                                    currentSort == 'decrease' ? dataArray.map(item => item[1]).sort((a,b) => a - b).reverse() : ''

                                if(currentSort != 'default')
                                    dataArray = dataArray.map(function(item) {
                                        var n = SortArray.indexOf(item[1]);
                                        SortArray[n] = '';
                                        return [n, item]
                                    }).sort().map(function(j) { return j[1] })


                                if(dataArray[index] && dataArray[index][0])
                                    return digitsEnToFa(dataArray[index][0])

                            }
                        }
                    }
                },
                title : {
                    font : {
                        family : 'IRANSans'
                    } ,
                }
            }
        }
    };
}