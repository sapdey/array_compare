import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    initial: '',
    check: '',
    unique: null,
    duplicates: null
  }

  extractArray(input) {
    if (input) {
      input = input.split(',')
        .reduce((acc, item) => {
          if (item.includes('-')) return acc.concat(this.extraArrayfromRange(item));
          else if (item === '') return acc.concat(false);
          return acc.concat(Number(item))
        }, []).sort();

      return input.filter((item, position, arr) => {
        return item !== false && (!position || item !== arr[position - 1]);
      })
    }
  }

  extraArrayfromRange(input) {
    input = input.split('-');
    let a = Number(input[0]);
    let b = Number(input[1]);
    if (a < b) {
      let arr = [];
      for (let i = a; i <= b; i++) {
        arr.push(i)
      }
      return arr;
    } else if (a === b) {
      return a;
    }
    return false
  }

  compareArrays(arr1, arr2) {
    let finalArray = arr1.concat(arr2).sort((a, b) => a - b);
    let unique = [], duplicates = [];
    for (let i = 0; i < finalArray.length; i++) {
      if (finalArray[i] === finalArray[i + 1]) {
        duplicates.push(finalArray[i]);
        i++;
      } else {
        unique.push(finalArray[i])
      }
    }
    return { unique, duplicates };
  }

  handleInputChange = (name) => (e) => {
    let value = e.target.value
    if ((/^[0-9,,-]+$/).test(value)) {
      this.setState({ [name]: value })
    } else if (value === '') {
      this.setState({ [name]: value })
    }

    if (name === 'check') {
      this.checkDuplicate(value);
    }
  }

  checkDuplicate = (check) => {
    let initialArr = this.extractArray(this.state.initial);
    let comparableArr = this.extractArray(check);
    let { unique, duplicates } = this.compareArrays(initialArr, comparableArr);

    this.setState({ unique, duplicates });
  }

  render() {
    let { initial, check, unique, duplicates } = this.state;
    return (
      <div className="App">
        <br />
        <label>Enter the initial array: </label>
        <input name="initial" value={initial} onChange={this.handleInputChange("initial")} />
        <br />
        <br />
        <label>Compare your input: </label>
        <input name="check" value={check} onChange={this.handleInputChange("check")} />

        {unique !== null && <div>Unique items: {unique.length > 0 ? unique.map((item, index) => (
          <span key={index}>{item},</span>
        )) : <span>No unique</span>}</div>}
        {duplicates !== null && <div>Duplicate items: {duplicates.length > 0 ? duplicates.map((item, index) => (
          <span key={index}>{item},</span>
        )) : <span>No duplicates</span>}</div>}
      </div>
    );
  }
}

export default App;
