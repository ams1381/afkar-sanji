import { TableChart, TableHeadData } from '@/styles/Charts/ChartsPage'
import { digitsEnToFa } from '@persian-tools/persian-tools'
import React from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { fillArrayWithObject } from './QuestionChart'
import { RateIconGenerator } from '@/utilities/QuestionTypes'
import { Divider } from 'antd'

export const ChartGenerator = (chartType,data,PlotData,options,chartRef) => 
{

    switch(chartType)
    {
        case 'Line':
            if(PlotData?.question_type != 'integer_selective')
                return <Line id={PlotData.question_id} data={data} options={options} ref={chartRef} />
            else
                return <div style={{ margin : '24px 0', gap : 15 , display : 'flex' , justifyContent : 'center'}}>
                { Array.from({ length : PlotData.max }).map((item,index) => <span key={index}>
                    { RateIconGenerator(PlotData.shape,index + 1 <= Math.floor(PlotData.average))}
                </span>) }
                </div>
        case 'Bar':
            return <Bar data={data} id={PlotData.question_id} options={options} ref={chartRef}/>
        case 'Pie':
            return <Pie data={data} id={PlotData.question_id} options={options} ref={chartRef}/>
        case 'Table':
            if(PlotData?.question_type == 'integer_range')
            {
                return <div id={`Table${PlotData.question_id}`}>
                    <TableChart>
                    <thead>
                        <tr>
                            <TableHeadData hasdivider='active'>عدد طیفی</TableHeadData>
                            <TableHeadData hasdivider='active'>درصد فراوانی</TableHeadData>
                            <TableHeadData>فراوانی پاسخ</TableHeadData>
                        </tr>
                    </thead>
                    <tbody>
                        {
                         fillArrayWithObject(PlotData.counts,PlotData.max).map((item,index) => <tr>
                            <td>{PlotData.min == 0 ? digitsEnToFa(index) : digitsEnToFa(index + 1)}</td>
                            <td>
                                {digitsEnToFa(parseFloat(item / PlotData.count * 100).toFixed(2))}%
                            </td>
                            <td>
                                {digitsEnToFa(item)}
                            </td>
                        </tr>) }
                    </tbody>
                </TableChart>
                <TableChart>
                    <thead>
                        <tr>
                            <TableHeadData hasdivider='active'>میانگین</TableHeadData>
                            <TableHeadData hasdivider='active'>میانه</TableHeadData>
                            <TableHeadData hasdivider='active'>مد</TableHeadData>
                            <TableHeadData hasdivider='active'>انحراف معیار</TableHeadData>
                            <TableHeadData>واریانس</TableHeadData>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{digitsEnToFa(PlotData.average)}</td>
                            <td>{digitsEnToFa(PlotData.median)}</td>
                            <td>{digitsEnToFa(PlotData.mode)}</td>
                            <td>{digitsEnToFa(parseFloat(PlotData.standard_deviation).toFixed(2))}</td>
                            <td>{digitsEnToFa(parseFloat(PlotData.variance).toFixed(2))}</td>
                        </tr>
                    </tbody>
                </TableChart>
                </div> 
            }
            if(PlotData?.question_type == 'integer_selective')
            {
                return <div id={`Table${PlotData.question_id}`}>
                <TableChart>
                <thead>
                    <tr>
                        <TableHeadData hasdivider='active'>عدد درجه</TableHeadData>
                        <TableHeadData hasdivider='active'>درصد فراوانی</TableHeadData>
                        <TableHeadData>فراوانی پاسخ</TableHeadData>
                    </tr>
                </thead>
                <tbody>
                    {
                     fillArrayWithObject(PlotData.counts,PlotData.max).map((item,index) => <tr>
                        <td>{PlotData.min == 0 ? digitsEnToFa(index) : digitsEnToFa(index + 1)}</td>
                        <td>
                            {digitsEnToFa(parseFloat(item / PlotData.count * 100).toFixed(2))}%
                        </td>
                        <td>
                            {digitsEnToFa(item)}
                        </td>
                    </tr>) }
                </tbody>
            </TableChart>
            <TableChart>
                <thead>
                    <tr>
                        <TableHeadData hasdivider='active'>میانگین</TableHeadData>
                        <TableHeadData hasdivider='active'>میانه</TableHeadData>
                        <TableHeadData hasdivider='active'>مد</TableHeadData>
                        <TableHeadData hasdivider='active'>انحراف معیار</TableHeadData>
                        <TableHeadData>واریانس</TableHeadData>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{digitsEnToFa(PlotData.average)}</td>
                        <td>{digitsEnToFa(PlotData.median)}</td>
                        <td>{digitsEnToFa(PlotData.mode)}</td>
                        <td>{digitsEnToFa(parseFloat(PlotData.standard_deviation).toFixed(2))}</td>
                        <td>{digitsEnToFa(parseFloat(PlotData.variance).toFixed(2))}</td>
                    </tr>
                </tbody>
            </TableChart>
            </div> 
            }
            if(PlotData?.question_type == 'number_answer')
            {
                return <div id={`Table${PlotData.question_id}`}>
                    <TableChart>
                    <thead>
                        <tr>
                            <TableHeadData hasdivider='active'>عدد</TableHeadData>
                            <TableHeadData hasdivider='active'>فراوانی پاسخ</TableHeadData>
                            <TableHeadData>درصد فراوانی</TableHeadData>
                        </tr>
                    </thead>
                    <tbody>
                        {PlotData.counts && Object.keys(PlotData.counts)?.map((item,index) => <tr key={index}>
                            <td>{digitsEnToFa(item)}</td>
                            <td>{digitsEnToFa(PlotData.counts[item] / PlotData.count)}</td>
                            <td>{digitsEnToFa(parseFloat(PlotData.counts[item] / PlotData.count * 100).toFixed(2))}%</td>
                        </tr>)}
                    </tbody>
                </TableChart>
                <TableChart style={{ marginTop : 24 }}>
                    <thead>
                        <tr>
                            <TableHeadData hasdivider='active'>میانگین</TableHeadData>
                            <TableHeadData hasdivider='active'>میانه</TableHeadData>
                            <TableHeadData hasdivider='active'>مد</TableHeadData>
                            <TableHeadData hasdivider='active'>انحراف معیار</TableHeadData>
                            <TableHeadData>واریانس</TableHeadData>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{digitsEnToFa(PlotData.average)}</td>
                            <td>{digitsEnToFa(PlotData.median)}</td>
                            <td>{digitsEnToFa(PlotData.mode)}</td>
                            <td>{digitsEnToFa(parseFloat(PlotData.standard_deviation).toFixed(2))}</td>
                            <td>{digitsEnToFa(parseFloat(PlotData.variance).toFixed(2))}</td>
                        </tr>
                    </tbody>
                </TableChart>
                </div> 
            }
            else
            {
                let attendersNumber = 0;
                PlotData.counts ? 
                Object.values(PlotData.counts).forEach(item => attendersNumber += item) : ''
                
                return <TableChart id={`Table${PlotData.question_id}`}>
                <thead>
                    <tr>
                        <TableHeadData hasdivider='active'>گزینه</TableHeadData>
                        <TableHeadData hasdivider='active'>فراوانی پاسخ</TableHeadData>       
                        <TableHeadData>درصد فراوانی</TableHeadData>
                    </tr>
                </thead>
                <tbody>
                    {PlotData?.options?.map((item,index) => 
                    <tr key={index}>
                        <td>{digitsEnToFa(index)}</td>
                        <td>{PlotData?.percentages && 
                        digitsEnToFa(Object.values(PlotData?.counts)[index])}</td>
                        <td>{PlotData?.percentages && 
                        digitsEnToFa(parseFloat(Object.values(PlotData?.percentages)[index]).toFixed(2)) + '%'}</td>
                    </tr>
                    )}
                    <tr>
                        <td>تعداد کل انتخاب ها</td>
                        <td>{digitsEnToFa(attendersNumber)}</td>
                    </tr>
                </tbody>
            </TableChart>
            }
            
        case 'HorizontalBar':
            return <Bar id={PlotData.question_id}  data={data} options={options}/>
    }
}
