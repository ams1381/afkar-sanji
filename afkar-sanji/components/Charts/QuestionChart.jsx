import { QuestionChartContainer , QuestionChartContainerHeader , QuestionChartBodyContainer } from '@/styles/Charts/ChartsPage'
import { Icon } from '@/styles/icons'
import { QuestionTypeIcon } from '@/utilities/QuestionTypes'
import { Popover } from 'antd'
import React from 'react'
import { useState } from 'react'
import { SortPopoverContent } from './SortPopoverContent'
import { ChartTypePopover } from './ChartTypePopover'
import { Bar, Line, Pie } from 'react-chartjs-2'
import 'chart.js/auto'
import { ChartGenerator } from './ChartGenerator'
import { defaults } from 'react-chartjs-2';
import { digitsEnToFa } from '@persian-tools/persian-tools'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect } from 'react'
import { useRef } from 'react'
import html2canvas from 'html2canvas'


const exportChart = async (ChartID,ChartType) => {
  // const canvas = document.getElementById(ChartID);
  if(!ChartID)
      return
    try 
    {
      let canvas;
      if(ChartType == 'Table')
      {
        canvas = await html2canvas(document.querySelector(`#Table${ChartID}`));
      } 
      else
        canvas = document.getElementById(ChartID);
     
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'chart.png';
      link.click();
    }
    catch(err)
    {
      console.log(err)
    }
}
export const QuestionChart = ({ PlotDetail , totalChartType , totalChartSort}) => {
    const [ FilterPopover , setFilterPopover ] = useState(false);
    const [ ChangeChartTypePopover , setChangeChartTypePopover ] = useState(false);
    const [ currentChartType , setCurrentChartType ] = useState(totalChartType ? totalChartType :'Pie');
    const [ currentSort , setCurrentSort ] = useState(totalChartSort ? totalChartSort : 'default');
    const indexAxis = (currentChartType == 'HorizontalBar' ? 'y' : 'x');
    const regex = /(<([^>]+)>)/gi;
    const chartRef = useRef(null);
    let data;
    
    useEffect(() => {
        if(totalChartType)
            setCurrentChartType(totalChartType)
    },[totalChartType])
    useEffect(() => {
        if(totalChartSort)
          setCurrentSort(totalChartSort)
    },[totalChartSort])
    const options = {
        // responsive: true,
        aspectRatio: 1,
        // maintainAspectRatio: false,
        indexAxis: indexAxis,
        plugins: {
          legend: {
            display:  currentChartType == 'Pie',
            position: 'right',
            labels: {
              
              color: "#666",
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
          //   callback: function(value, index, ticks) {
          //     return digitsEnToFa(value);
          // }
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
            return digitsEnToFa(value);
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
    console.log()
    if(PlotDetail.options)
    {
      data = {
        
        type : currentChartType == 'Line' ? 'line' : (currentChartType == 'Bar' ||  currentChartType == 'HorizontalBar') ? 'bar' :'pie',
        labels: Object.values(PlotDetail.counts).every(item => item == 0) ? [] :
        currentSort == 'default' ? PlotDetail.options?.map(item => item.text?.replace(regex,"")) :
        currentSort == 'increase' ? rearrangeTextArray(PlotDetail.options?.map(item => item.text?.replace(regex,"")),Object.values(PlotDetail.counts),Object.values(PlotDetail.counts).sort((a,b) => a - b)) 
        : currentSort == 'decrease' ? rearrangeTextArray(PlotDetail.options?.map(item => item.text?.replace(regex,"")),Object.values(PlotDetail.counts),Object.values(PlotDetail.counts).sort((a,b) => a - b).reverse())
        : [] 
        ,
        datasets: [
          {
            data: PlotDetail.counts ?  
            currentSort == 'default' ?  Object.values(PlotDetail.counts) : currentSort == 'increase' ?
            Object.values(PlotDetail.counts).sort((a,b) => a - b) : currentSort == 'decrease' ?
             Object.values(PlotDetail.counts).sort((a,b) => a - b).reverse() : ''
            : [],
            // fill: true,
            backgroundColor: currentChartType != 'Line' ? generateRandomColors(PlotDetail.options?.length) : null ,
            borderColor: currentChartType == 'Line' ? generateRandomColors(1) : 'transparent',
            fontFamily : 'IRANSans',
            yAxisID : 'y'
          },
        ],
      };
    }
     
    else if(PlotDetail.question_type == 'integer_range' || PlotDetail.question_type == 'integer_selective')
    {
      // const arrayToSort = [
      //   [1, 0, 1, 0, 0, 0],
      //   [0, 0, 0, 0, 1, 1],
      //   [1, 1, 0, 0, 0, 0]
      // ];
      console.log('default',fillArrayWithObject(PlotDetail.counts , PlotDetail.max))
      console.log('increase', sortArrayByPattern(Array.from({ length : PlotDetail.max }).map((_,index) => (PlotDetail.max == 0 ? index : index + 1)),
        fillArrayWithObject(PlotDetail.counts , PlotDetail.max).sort((a,b) => a - b)),
      fillArrayWithObject(PlotDetail.counts , PlotDetail.max).sort((a,b) => a - b))
      console.log('decrease',fillArrayWithObject(PlotDetail.counts , PlotDetail.max).sort((a,b) => a - b).reverse())


      // console.log( 
      // currentSort == 'increase' ? 
      // fillArrayWithObject(PlotDetail.counts , PlotDetail.max).sort((a,b) => a - b))
      // : currentSort == 'decrease' ?
      // fillArrayWithObject(PlotDetail.counts , PlotDetail.max).sort((a,b) => a - b).reverse()) : []
      // console.log(fillArrayWithObject(PlotDetail.counts , PlotDetail.max).sort((a,b) => a - b) , fillArrayWithObject(PlotDetail.counts , PlotDetail.max))
        data = {
            
            type : currentChartType == 'Line' ? 'line' : (currentChartType == 'Bar' ||  currentChartType == 'HorizontalBar') ? 'bar' :'pie',
            labels: (currentSort == 'default') ? Array.from({ length : PlotDetail.max }).map((_,index) =>
               (PlotDetail.max == 0 ? index : index + 1)) : 
               currentSort == 'increase' ? 
               sortArrayByChanges(Array.from({ length : PlotDetail.max }).map((_,index) => (PlotDetail.max == 0 ? index : index + 1)),objectToSparseArray(PlotDetail.counts , PlotDetail.max),
               objectToSparseArray(PlotDetail.counts , PlotDetail.max).sort((a,b) => a - b))
               : currentSort == 'decrease' ?
               sortArrayByChanges(Array.from({ length : PlotDetail.max }).map((_,index) => (PlotDetail.max == 0 ? index : index + 1)),objectToSparseArray(PlotDetail.counts , PlotDetail.max),
               objectToSparseArray(PlotDetail.counts , PlotDetail.max).sort((a,b) => a - b).reverse()) : []
               ,
            datasets: [
              {
                data: currentSort == 'default' ? objectToSparseArray(PlotDetail.counts , PlotDetail.max) :
                currentSort == 'increase' ? objectToSparseArray(PlotDetail.counts , PlotDetail.max).sort((a,b) => a - b) :
                currentSort == 'decrease' ? objectToSparseArray(PlotDetail.counts , PlotDetail.max).sort((a,b) => a - b).reverse() : []
                ,
                // fill: true,
                backgroundColor: currentChartType != 'Line' ? generateRandomColors(PlotDetail.max) : null ,
                borderColor: currentChartType == 'Line' ? generateRandomColors(1) : 'transparent',
                fontFamily : 'IRANSans',
                yAxisID : 'y'
              },
            ],
          };
    }
    else if(PlotDetail.question_type == 'number_answer')
    {
      // sortArrayByChanges(Object.keys(PlotDetail.counts),
      // Object.values(PlotDetail.counts).map(item => (item)),
      // Object.values(PlotDetail.counts).map(item => (item)).sort((a,b) => a - b).reverse())
      // console.log(sortObjectByValues(PlotDetail.counts,false))
      data = {
        
        type : currentChartType == 'Line' ? 'line' : (currentChartType == 'Bar' ||  currentChartType == 'HorizontalBar') ? 'bar' :'pie',
        labels: (currentSort == 'default') ? Object.keys(PlotDetail.counts).map((item,index) =>
               digitsEnToFa(item)) : 
               currentSort == 'increase' ? 
               Object.keys(sortObjectByValues(PlotDetail.counts)).map((item,index) => digitsEnToFa(item))
               :
               currentSort == 'decrease' ? Object.keys(sortObjectByValues(PlotDetail.counts,false)).map((item,index) => digitsEnToFa(item)).reverse() : []
               ,
        datasets: [
          {
            data: Object.values(PlotDetail.counts).length == 1 ? [(Object.values(PlotDetail.counts)[0])]
            : currentSort == 'default' ? Object.values(PlotDetail.counts).map(item => (item)) :
            currentSort == 'increase' ? Object.values(PlotDetail.counts).map(item => (item)).sort((a,b) => a - b) :
            currentSort == 'decrease' ? Object.values(PlotDetail.counts).map(item => (item)).sort((a,b) => a - b).reverse() : []
            ,
            // fill: true,
            backgroundColor: currentChartType != 'Line' ? generateRandomColors(PlotDetail.max) : null ,
            borderColor: currentChartType == 'Line' ? generateRandomColors(1) : 'transparent',
            fontFamily : 'IRANSans',
            yAxisID : 'y',
           
          },
        ],
      };
    }
  return (
    <QuestionChartContainer>
        <QuestionChartContainerHeader>
            <div className='question_chart_title'>
                { QuestionTypeIcon(PlotDetail.question_type) }
                <p>{PlotDetail.question}</p>
            </div>
            <div className='question_chart_buttons'>
                <Popover 
                open={FilterPopover}
                placement='bottom'
                content={<SortPopoverContent setCurrentSort={setCurrentSort} />}
                onOpenChange={() => setFilterPopover(false)}
                 trigger='click'>
                    <button onClick={() => setFilterPopover(!FilterPopover)}>
                        <Icon name='Filter' />
                </button>
                </Popover>
                <Popover open={ChangeChartTypePopover}
                placement='bottom'
                content={<ChartTypePopover setCurrentChartType={setCurrentChartType} 
                closePopover={() => setChangeChartTypePopover(false)} />}
                onOpenChange={() => setChangeChartTypePopover(false)}
                 rigger='click'>
                    <button onClick={() => setChangeChartTypePopover(!ChangeChartTypePopover)}>
                        <Icon name='CircleSlice' />
                    </button>
                </Popover>
               <button className='ExportChart' onClick={() => exportChart(PlotDetail.question_id,currentChartType)}>
                <Icon name='Upload' />
               </button>
            </div>
        </QuestionChartContainerHeader>
        <div>
            <div style={{ width : 'fit-content' , margin : '0 auto' }}>
            { data && ChartGenerator(currentChartType,data,PlotDetail,options,chartRef) }
            </div>
        </div>
    </QuestionChartContainer>
  )
}
const generateRandomColors = (count) => {
    const colors = [];
    const letters = '0123456789ABCDEF';
  
    while (colors.length < count) {
      const color = '#' + Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * 16)]).join('');
      colors.push(color);
    }
  
    return colors;
 };
export function fillArrayWithObject(obj, length) {
  const resultArray = new Array(length).fill(0); // Create an array of length with all zeros

  for (const key in obj) {
    const index = parseInt(key) - 1;
    if (!isNaN(index) && index >= 0 && index < length) {
      resultArray[index] = obj[key];
    }
  }

  return resultArray;
}
function rearrangeTextArray(textArray, sourceIndices, targetIndices) {
  if (
    textArray.length !== sourceIndices.length ||
    textArray.length !== targetIndices.length
  ) {
    throw new Error("Input arrays must have the same length.");
  }

  // Create an array to store elements grouped by target index
  const groupedElements = [];

  for (let i = 0; i < textArray.length; i++) {
    const targetIndex = targetIndices[i];

    // Initialize an array for the target index if not already present
    if (!groupedElements[targetIndex]) {
      groupedElements[targetIndex] = [];
    }

    // Push the element along with its source index
    groupedElements[targetIndex].push({ text: textArray[i], sourceIndex: sourceIndices[i] });
  }

  // Flatten the grouped elements while maintaining the order
  const rearrangedArray = [];
  for (let targetIndex = 0; targetIndex < groupedElements.length; targetIndex++) {
    const elements = groupedElements[targetIndex];
    if (elements) {
      // Sort the elements by their source index
      elements.sort((a, b) => a.sourceIndex - b.sourceIndex);
      // Push the sorted elements into the rearranged array
      rearrangedArray.push(...elements.map((element) => element.text));
    }
  }

  return rearrangedArray;
}
function sortArrayByChanges(originalArray, initialArray, changedArray) {
  // Create an array of objects, each containing the original number and its corresponding change values
  const combinedArray = originalArray.map((number, index) => ({
    number,
    changeValue: changedArray[index] - initialArray[index],
  }));

  // Sort the combined array based on the change values
  combinedArray.sort((a, b) => b.changeValue - a.changeValue);

  // Extract the sorted numbers from the combined array
  const sortedArray = combinedArray.map(item => item.number);

  return sortedArray;
}

function sortObjectByValues(obj, isAscending = true) {
  return Object.fromEntries(Object.entries(obj)
    .sort((a, b) => isAscending ? a[1] - b[1] : b[1] - a[1])
  );
}
function objectToSparseArray(obj, length) {
  const resultArray = Array(length).fill(0);

  for (const key in obj) {
    const index = parseInt(key, 10) - 1; // Adjust index to start from 0
    if (!isNaN(index) && index >= 0 && index < length) {
      resultArray[index] = obj[key];
    }
  }

  return resultArray;
}
function sortArrayByPattern(arr, pattern) {
  const result = [];
  
  // Separate the array into parts based on the pattern
  const increasePart = arr.filter((_, i) => pattern[i] === 1);
  const noChangePart = arr.filter((_, i) => pattern[i] === 0);
  
  // Sort the parts accordingly
  increasePart.sort((a, b) => a - b);
  
  // Reconstruct the array based on the pattern
  for (const val of pattern) {
    if (val === 1) {
      result.push(increasePart.shift());
    } else {
      result.push(noChangePart.shift());
    }
  }
  
  return result;
}