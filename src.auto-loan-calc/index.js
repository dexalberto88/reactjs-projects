import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function ResultDisplay(props) {
  return (
    <div>
      <h2>Results</h2>
      <table>
        <tr>
          <td>Vehicle price</td>
          <td>{props.price}</td>
        </tr>
        <tr>
          <td>Downpayment</td>
          <td>20%</td>
          <td>30%</td>
          <td>40%</td>
        </tr>
        <tr>
          <td>Downpayment Amount</td>
          <td>{props.dp20}</td>
          <td>{props.dp30}</td>
          <td>{props.dp40}</td>
        </tr>         
        <tr>
          <td>Loan Term</td>
          <td>{props.term}</td>
        </tr>
        <tr>
          <td>Loan Amount</td>
          <td>{props.la20}</td>
          <td>{props.la30}</td>
          <td>{props.la40}</td>
        </tr>
        <tr>
          <td>Monthly Amortization</td>
          <td>{props.ma20}</td>
          <td>{props.ma30}</td>
          <td>{props.ma40}</td>
        </tr>
      </table>
    </div>
  );
}

class MonthlyAmortizationCalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {compute: 0, term: 60, price: 0};
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  computePMT(ir, np, pv, fv, type) {
    /*
     * ir   - interest rate per month
     * np   - number of periods (months)
     * pv   - present value
     * fv   - future value
     * type - when the payments are due:
     *        0: end of the period, e.g. end of month (default)
     *        1: beginning of period
     */
    var pmt, pvif;

    fv || (fv = 0);
    type || (type = 0);

    if (ir === 0)
        return -(pv + fv)/np;

    pvif = Math.pow(1 + ir, np);
    pmt = - ir * (pv * pvif + fv) / (pvif - 1);

    if (type === 1)
        pmt /= (1 + ir);

    return pmt;
  }

  render() {
    let dp20 = (this.state.price * 0.20).toFixed(2);
    let dp30 = (this.state.price * 0.30).toFixed(2);
    let dp40 = (this.state.price * 0.40).toFixed(2);
    let la20 = this.state.price - dp20;
    let la30 = this.state.price - dp30;
    let la40 = this.state.price - dp40;
    let iRate = 0;

    if (parseFloat(this.state.term) === 60)
      iRate = 10.93;
    else if (parseFloat(this.state.term) === 48)
      iRate = 10.78;
    else if (parseFloat(this.state.term) === 36)
      iRate = 10.69;

    let ma20 = -this.computePMT((iRate/100)/12, this.state.term, la20).toFixed(2);
    let ma30 = -this.computePMT((iRate/100)/12, this.state.term, la30).toFixed(2);
    let ma40 = -this.computePMT((iRate/100)/12, this.state.term, la40).toFixed(2);

    return(
      <div>
        <h1>Auto Loan Calculator</h1>
        <h2>Inputs</h2>
        <form>
          <label>
            Vehicle Price
            <input
              name="price"
              type="number"
              value={this.state.price}
              onChange={this.handleInputChange}
            />
          </label>
          <br/>
          <label>
            Loan Term
            <select name="term" value={this.state.term} onChange={this.handleInputChange}>
              <option value="60">60</option>
              <option value="48">48</option>
              <option value="36">36</option>
            </select>
          </label>
        </form>
        <ResultDisplay term={this.state.term} price={this.state.price}
          dp20={dp20} dp30={dp30} dp40={dp40}
          la20={la20} la30={la30} la40={la40}
          ma20={ma20} ma30={ma30} ma40={ma40}/>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MonthlyAmortizationCalc />);