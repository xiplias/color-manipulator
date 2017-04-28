import React, { Component } from "react"
import Color from "color"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"

class App extends Component {
  constructor() {
    super()

    this.state = {
      R: 0,
      G: 0,
      B: 0,
      H: 0,
      S: 0,
      V: 0,
      HEX: "#000000"
    }
  }

  generateColor(name, value) {
    const state = this.state
    let color

    if (name === "R" || name === "G" || name === "B") {
      color = Color({
        red: name === "R" ? value : state.R,
        green: name === "G" ? value : state.G,
        blue: name === "B" ? value : state.B
      })
    }

    if (name === "H" || name === "S" || name === "V") {
      color = Color({
        hue: name === "H" ? value : state.H,
        saturation: name === "S" ? value : state.S,
        value: name === "V" ? value : state.V
      })
    }

    if (name === "lighter") {
      color = Color({
        hue: state.H,
        saturation: state.S,
        value: state.V
      })
      color.value(state.V + 10)
    }

    if (name === "darker") {
      color = Color({
        hue: state.H,
        saturation: state.S,
        value: state.V
      })
      color.value(state.V - 10)
    }

    if (name === "hex") {
      try {
        color = Color(value)
      } catch (err) {}
    }

    const rgb = color.rgb()
    const hsv = color.hsv()

    return {
      R: rgb.r,
      G: rgb.g,
      B: rgb.b,
      H: hsv.h,
      S: hsv.s,
      V: hsv.v,
      HEX: color.hexString()
    }
  }

  setColorState(name, value) {
    const color = this.generateColor(name, value)
    console.log(color)
    this.setState(color)
  }

  handleInputChange(e) {
    console.log(e.key)
    if (e.key === "Enter") {
      this.setColorState("hex", e.target.value)
    }
  }

  render() {
    return (
      <div className="App m4">
        <SliderWithInput
          title="R"
          callback={this.setColorState.bind(this)}
          value={this.state.R}
          max={255}
        />
        <SliderWithInput
          title="G"
          callback={this.setColorState.bind(this)}
          value={this.state.G}
          max={255}
        />
        <SliderWithInput
          title="B"
          callback={this.setColorState.bind(this)}
          value={this.state.B}
          max={255}
        />
        <hr />
        <SliderWithInput
          title="H"
          callback={this.setColorState.bind(this)}
          value={this.state.H}
          max={359}
        />
        <SliderWithInput
          title="S"
          callback={this.setColorState.bind(this)}
          value={this.state.S}
          max={100}
        />
        <SliderWithInput
          title="V"
          callback={this.setColorState.bind(this)}
          value={this.state.V}
          max={100}
        />

        <button onClick={() => this.setColorState("lighter")}>Lighter</button>
        <button onClick={() => this.setColorState("darker")}>Darker</button>

        <div>
          <div
            style={{ width: "100%", height: 50, background: this.state.HEX }}
          />
          <input
            value={this.state.HEX}
            onKeyPress={this.handleInputChange.bind(this)}
          />
        </div>
      </div>
    )
  }
}

class SliderWithInput extends Component {
  onChange(value) {
    this.props.callback(this.props.title, value)
  }

  onTextChange(e) {
    this.props.callback(this.props.title, e.target.value)
  }

  render() {
    return (
      <div className="m4 flex">
        <div className="mr2">{this.props.title}</div>
        <Slider
          onChange={this.onChange.bind(this)}
          min={0}
          max={this.props.max}
          value={this.props.value}
        />
        <div className="ml2">
          <input
            value={this.props.value}
            style={{ width: 50 }}
            onChange={this.onTextChange.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default App
