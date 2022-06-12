import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

/*function ColorModeSelector(props) {
    return (
        <div>
            <label>
                {props.value}
                <input type="radio" name="color_mode" onChange={props.changed} value={props.value} checked={props.isSelected} />
            </label>
        </div>
    );
}*/

/*
Component ColorSelectorMode is used for building the color mode selectors for 
this small application. OnChange calls valueSelector.
*/
class ColorModeSelector extends React.Component {
    render() {
        return (
            <div>
                <label>
                    {this.props.value}
                    <input type="radio" name="color_mode" onChange={this.props.changed} 
                    value={this.props.value} checked={this.props.isSelected} />

                </label>
            </div>
        );
    }
}

/*
RenderSlider is used for building the sliders for different modes. If the value is in 
hexadecimal format it is converted to decimal value. OnChange calls valueModifier.
*/
class RenderSlider extends React.Component {
    isItHex() {
        if (/(hex)/i.test(this.props.id)) {
            return parseInt(this.props.value, 16);
        }
        return this.props.value;
    }

    render(){
        return (
            <div className='sliderdiv'>
                <label>
                    <div className='verticalrangeslider'>
                        <input type="range" min="0" max={this.props.max} 
                        value={this.isItHex()} step={this.props.step} 
                        onChange={this.props.changed} id={this.props.id}/>

                    </div>
                    <br/>{this.props.value}
                </label>
            </div>
        );
    }
}

class ColorSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colorPickerMode: "HEX",
            Rgba: 0, //red
            rGba: 0, //green
            rgBa: 0, //blue
            rgbA: 0, //alpha
            Hsla: 0, //hue
            hSla: 0, //saturation
            hsLa: 0, //lightness
            hslA: 0, //alpha
            Hex: "ff", //red channel
            hEx: "ff", //green channel
            heX: "ff", //blue channel
            backgroundColor: "#ffffff"
        };
        this.valueSelector = this.valueSelector.bind(this);
        this.valueModifier = this.valueModifier.bind(this);
        this.backgroundColorSetter = this.backgroundColorSetter.bind(this);
    }

    /*
    valueSelector is used for changing the color mode of the sliders, for example 
    pressing the HEX radio button the range sliders needed for modifying the hex values 
    would be rendered.
    */
    valueSelector(event) {
        this.setState({colorPickerMode: event.target.value}, () => {
            this.backgroundColorSetter(event.target.value);
        })
    }

    /*
    valueModifier is used for modifying the states of different color values. If the 
    value to be modified is a hex channel, decimal value is converted to hexadecimal.
    */
    valueModifier(event) {
        if (/(hex)/i.test(event.target.id)) {
            this.setState({[event.target.id]: this.hexValue(event.currentTarget.value)}, () => {
                this.backgroundColorSetter(event.target.id);
            })
        } else {
            this.setState({[event.target.id]: event.currentTarget.value}, () => {
                this.backgroundColorSetter(event.target.id);
            })
        }
    }

    //Converts decimal value to hexadecimal and if the length of the value is less
    //than 2 adds 0 to the beginning. For example "5" becomes "05".
    hexValue(decimal) {
        if (Number(decimal).toString(16).length < 2) {
            return "0" + Number(decimal).toString(16);
        }
        return Number(decimal).toString(16);
    }

    /*
    Updates the state of backgroundColor according to the color mode passed to it.
    */
    backgroundColorSetter(colorMode) {
        if (/(rgba)/i.test(colorMode)) { //Rgba, rGba, rgBa or rgbA
            this.setState(() => ({
                backgroundColor: `rgba(${this.state.Rgba}, ${this.state.rGba}, ${
                    this.state.rgBa}, ${this.state.rgbA})`
            }));
        } else if (/(hsla)/i.test(colorMode)) { //Hsla, hSla, hsLa or hslA
            this.setState(() => ({
                backgroundColor: `hsla(${this.state.Hsla}, ${this.state.hSla}%, ${
                    this.state.hsLa}%, ${this.state.hslA})`
            }));
        } else { //All the others, Hex, hEx or heX
            this.setState(() => ({
                backgroundColor: `#${this.state.Hex}${this.state.hEx}${this.state.heX}`
            }));
        }
    }

    render() {
        /*
        Declare and define sliders according to the colorPickerMode.
        */
        let slider1, slider2, slider3, slider4;
        if (this.state.colorPickerMode === "RGBA") {
            slider1 = <RenderSlider 
                max="255"
                value={this.state.Rgba}
                step="1"
                changed={this.valueModifier}
                id="Rgba"
            />
            slider2 = <RenderSlider 
                max="255"
                value={this.state.rGba}
                step="1"
                changed={this.valueModifier}
                id="rGba"
            />
            slider3 = <RenderSlider 
                max="255"
                value={this.state.rgBa}
                step="1"
                changed={this.valueModifier}
                id="rgBa"
            />
            slider4 = <RenderSlider 
                max="1"
                value={this.state.rgbA}
                step="0.01"
                changed={this.valueModifier}
                id="rgbA"
            />
        } else if (this.state.colorPickerMode === "HSLA") {
            slider1 = <RenderSlider 
                max="360"
                value={this.state.Hsla}
                step="1"
                changed={this.valueModifier}
                id="Hsla"
            />
            slider2 = <RenderSlider 
                max="100"
                value={this.state.hSla}
                step="1"
                changed={this.valueModifier}
                id="hSla"
            />
            slider3 = <RenderSlider 
                max="100"
                value={this.state.hsLa}
                step="1"
                changed={this.valueModifier}
                id="hsLa"
            />
            slider4 = <RenderSlider 
                max="1"
                value={this.state.hslA}
                step="0.01"
                changed={this.valueModifier}
                id="hslA"
            />
        } else if (this.state.colorPickerMode === "HEX") {
            slider1 = <RenderSlider 
                max="255"
                value={this.state.Hex}
                step="1"
                changed={this.valueModifier}
                id="Hex"
            />
            slider2 = <RenderSlider 
                max="255"
                value={this.state.hEx}
                step="1"
                changed={this.valueModifier}
                id="hEx"
            />
            slider3 = <RenderSlider 
                max="255"
                value={this.state.heX}
                step="1"
                changed={this.valueModifier}
                id="heX"
            />
            slider4 = null;
        }

        return(
            <div className='wrapper3x123'>
                <div className='colormodeselector'>
                    <ColorModeSelector 
                        changed={ this.valueSelector }
                        isSelected={ this.state.colorPickerMode === "RGBA" }
                        value="RGBA"
                    />
                    <ColorModeSelector 
                        changed={ this.valueSelector }
                        isSelected={ this.state.colorPickerMode === "HSLA" }
                        value="HSLA"
                    />
                    <ColorModeSelector 
                        changed={ this.valueSelector }
                        isSelected={ this.state.colorPickerMode === "HEX" }
                        value="HEX"
                    />
                </div>
                <div className='colordisplay' style={{backgroundColor: this.state.backgroundColor}}>
                    <p>{this.state.backgroundColor}</p>
                </div>
                <div className='sliderarea'>
                    {slider1}
                    {slider2}
                    {slider3}
                    {slider4 !== null && slider4}
                </div>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><ColorSlider /></React.StrictMode>);