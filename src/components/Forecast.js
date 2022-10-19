import React from 'react';
import { Card } from 'semantic-ui-react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faCloud, faCloudRain, faSmog, faSnowman, faSun,faTemperatureHigh,faDrawPolygon } from '@fortawesome/free-solid-svg-icons';

export default function Forecast({ forcast }) {


    return (
        <div style={{ marginTop: 20 }}>
            {/* <div className="forecast-main-header">
                8 Day Forecast
            </div> */}
            
            <Card.Group itemsPerRow={4}>
                {forcast.map((data) => {
                    return (
                        <Card className="forecast-card">
                            <Card.Content>
                                <Card.Header className="forecast-date">
                                     {moment.unix(data.dt).format('ll')}
                                </Card.Header>
                                <Card.Header className="forecast-header">
                                <FontAwesomeIcon icon={faTemperatureHigh}/> Temperature:  {Math.round((data.temp.max + data.temp.min) / 2)} ℃
                                </Card.Header>
                                <Card.Description className="forecast-header">
                                <FontAwesomeIcon icon={faBolt} />  &nbsp;&nbsp;Humidity:  {data.humidity} %
                                </Card.Description>
                                <Card.Description className="temp-desc">
                                <FontAwesomeIcon icon={faCloud}/> Weather: {data.weather[0].description}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    )
                })}
            </Card.Group>
        </div>
    )
}