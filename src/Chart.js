import '../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines} from 'react-vis';
import { Link } from 'react-router-dom';

const Chart = () => {
    const data = [
        {x: 0, y: 8 },
        {x: 1, y: 5 },
        {x: 2, y: 4 },
        {x: 3, y: 9 },
        {x: 4, y: 1 },
        {x: 5, y: 7 },
        {x: 6, y: 6 },
        {x: 7, y: 3 },
        {x: 8, y: 2 },
        {x: 9, y: 0 }
    ]

    return(
        <div className="page-content-wrapper">
                <div className="page-content">
                    <div className="page-bar" style={{marginBottom: '-20px'}}>
                        <ul className="page-breadcrumb">
                            <li>
                                <Link to='/'>Home&nbsp;</Link>
                                <i className="fa fa-circle"></i>
                            </li>
                            <li>
                                <span>&nbsp;Profile Detail</span>
                            </li>
                        </ul>
                    </div><hr />
                    <section>
                        <XYPlot height={300} width={300}>
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <XAxis />
                            <YAxis />
                            <LineSeries data={data} color="red" />
                            <LineSeries data={data} color="purple" />
                            <LineSeries data={data} color="yellow" />
                        </XYPlot> 
                        
                    </section>
                    
                </div>
            </div>
    )
}

export default Chart;