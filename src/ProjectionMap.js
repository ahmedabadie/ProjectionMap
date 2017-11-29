//import liraries
import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    ImageBackground
} from 'react-native';

import Proj4js from 'proj4'

import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

// create a component
class ProejctionMap extends Component {

    projectionPoints = () => {
        // let points = []
        // for(i = 0; i < 10; i++) {
        //     const random_index = parseInt(Math.random() * this.props.points.length) + 1
        //     points.push(this.props.points[random_index]);
        // }
        // return points
        return this.props.points
    }

    transform = ({lon, lat}) => {
        const source = new Proj4js.Proj('EPSG:4326');    //source coordinates will be in Longitude/Latitude, WGS84
        const dest = new Proj4js.Proj('EPSG:3785');     //destination coordinates in meters, global spherical mercators projection, see http://spatialreference.org/ref/epsg/3785/

        var p = new Proj4js.toPoint([lon, lat]);   //any object will do as long as it has 'x' and 'y' properties
        var t = Proj4js.transform(source, dest, p);      //do the transformation.  x and y are modified in place

        const X_HALF = 20037508.3428
        const Y_HALF = 10971868.8804 // I've adjust for our map.png from Projected Bounds

        // WGS84 Bounds: -180.0000, -85.0000, 180.0000, 85.0000
        // Projected Bounds: -20037508.3428, -19971868.8804, 20037508.3428, 19971868.8804
        return {x: (t.x + X_HALF) / (X_HALF * 2), y: 1.0 - (t.y + Y_HALF) / (Y_HALF * 2)}
    }

    drawPoints = () => {
        const points = this.projectionPoints()
        const transformed_points = points.map(({lat, lon, city}) => {
            return {city, lat, lon, ...this.transform({lat, lon})}
        })
        
        const width = 355
        const height = 178

        return transformed_points.map(point => {
            const cx = point.x * width
            const cy = point.y * height
            const city = point.city

            console.log(point.x, point.y, cx, cy)

            return (<Circle key={city} cx={cx} cy={cy} r={2} fill="red" />)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={this.props.mapImageSource} style={styles.map}>
                    <Svg width="355" height="178">
                        {this.drawPoints()}
                    </Svg>
                </ImageBackground>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink'
    },
    map: {
        width: 355,
        height: 178
    }
});

//make this component available to the app
export default ProejctionMap;
