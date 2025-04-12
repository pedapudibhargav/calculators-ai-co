'use client';
import { PieChart, PiePlot, ResponsiveChartContainer } from '@mui/x-charts';
import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';

export const valueFormatter = (item) => `$${item.value.toFixed(2)}`;
const MortgageCalculator = () => {
  // State for loan details
  const [purchasePrice, setPurchasePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(30);

  // State for recurring costs and inclusion toggles
  const [propertyTaxes, setPropertyTaxes] = useState(3300);
  const [includeTaxes, setIncludeTaxes] = useState(false);
  const [homeInsurance, setHomeInsurance] = useState(1000);
  const [includeInsurance, setIncludeInsurance] = useState(false);
  const [pmi, setPmi] = useState(1200);
  const [includePmi, setIncludePmi] = useState(false);
  const [hoaFee, setHoaFee] = useState(600);
  const [includeHoa, setIncludeHoa] = useState(false);
  const [otherCosts, setOtherCosts] = useState(1200);
  const [includeOtherCosts, setIncludeOtherCosts] = useState(false);

  // State for result
  const [monthlyPayment, setMonthlyPayment] = useState(1288.37);
  const [monthlyPaymentChartData, setMonthlyPaymentChartData] = useState([{"label":"Principal & Interest","value":1288.3718952291354}]);

  const calculatePayment = () => {
    const principal = parseFloat(purchasePrice) - parseFloat(downPayment);
    const monthlyInterest = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseFloat(loanTerm) * 12;

    if (principal <= 0 || !monthlyInterest || !numberOfPayments) {
      setMonthlyPayment(null);
      return;
    }

    // Calculate principal and interest (P&I)
    const piPayment = (principal * monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments)) /
      (Math.pow(1 + monthlyInterest, numberOfPayments) - 1);

    // Add recurring costs if included
    let totalMonthly = piPayment;
    if (includeTaxes) totalMonthly += parseFloat(propertyTaxes) / 12;
    if (includeInsurance) totalMonthly += parseFloat(homeInsurance) / 12;
    if (includePmi) totalMonthly += parseFloat(pmi) / 12;
    if (includeHoa) totalMonthly += parseFloat(hoaFee) / 12;
    if (includeOtherCosts) totalMonthly += parseFloat(otherCosts) / 12;

    setMonthlyPayment(totalMonthly.toFixed(2));

    // Prepare data for pie chart
    const chartData = [
      { label: 'Principal & Interest', value: piPayment },
      ...(includeTaxes ? [{ label: 'Property Taxes', value: parseFloat(propertyTaxes) / 12 }] : []),
      ...(includeInsurance ? [{ label: 'Home Insurance', value: parseFloat(homeInsurance) / 12 }] : []),
      ...(includePmi ? [{ label: 'PMI', value: parseFloat(pmi) / 12 }] : []),
      ...(includeHoa ? [{ label: 'HOA Fee', value: parseFloat(hoaFee) / 12 }] : []),
      ...(includeOtherCosts ? [{ label: 'Other Costs', value: parseFloat(otherCosts) / 12 }] : []),
    ];
    setMonthlyPaymentChartData(chartData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculatePayment();
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card style={{ margin: '20px auto', padding: '20px' }}>
            <Card.Body>
              <Card.Title as="h2">Mortgage Calculator</Card.Title>
              <Container>
                <Row>
                  <Col sm={12} md={6}>
                    <Form onSubmit={handleSubmit}>
                      {/* Loan Details */}
                      <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={6}>Purchase Price ($)</Form.Label>
                        <Col sm={6}>
                          <Form.Control
                            type="number"
                            value={purchasePrice}
                            onChange={(e) => setPurchasePrice(e.target.value)}
                            min="1"
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={6}>Down Payment ($)</Form.Label>
                        <Col sm={6}>
                          <Form.Control
                            type="number"
                            value={downPayment}
                            onChange={(e) => setDownPayment(e.target.value)}
                            min="0"
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={6}>Interest Rate (%)</Form.Label>
                        <Col sm={6}>
                          <Form.Control
                            type="number"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            step="0.1"
                            min="0"
                            max="100"
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={6}>Loan Term (years)</Form.Label>
                        <Col sm={6}>
                          <Form.Control
                            type="number"
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(e.target.value)}
                            min="1"
                          />
                        </Col>
                      </Form.Group>

                      {/* Recurring Costs */}
                      <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={6}>Property Taxes ($/year)</Form.Label>
                        <Col sm={4}>
                          <Form.Control
                            type="number"
                            value={propertyTaxes}
                            onChange={(e) => setPropertyTaxes(e.target.value)}
                            min="0"
                            disabled={!includeTaxes}
                          />
                        </Col>
                        <Col sm={2}>
                          <Form.Check
                            type="checkbox"
                            label="Include"
                            checked={includeTaxes}
                            onChange={(e) => setIncludeTaxes(e.target.checked)}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={6}>Home Insurance ($/year)</Form.Label>
                        <Col sm={4}>
                          <Form.Control
                            type="number"
                            value={homeInsurance}
                            onChange={(e) => setHomeInsurance(e.target.value)}
                            min="0"
                            disabled={!includeInsurance}
                          />
                        </Col>
                        <Col sm={2}>
                          <Form.Check
                            type="checkbox"
                            label="Include"
                            checked={includeInsurance}
                            onChange={(e) => setIncludeInsurance(e.target.checked)}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={6}>PMI ($/year)</Form.Label>
                        <Col sm={4}>
                          <Form.Control
                            type="number"
                            value={pmi}
                            onChange={(e) => setPmi(e.target.value)}
                            min="0"
                            disabled={!includePmi}
                          />
                        </Col>
                        <Col sm={2}>
                          <Form.Check
                            type="checkbox"
                            label="Include"
                            checked={includePmi}
                            onChange={(e) => setIncludePmi(e.target.checked)}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={6}>HOA Fee ($/year)</Form.Label>
                        <Col sm={4}>
                          <Form.Control
                            type="number"
                            value={hoaFee}
                            onChange={(e) => setHoaFee(e.target.value)}
                            min="0"
                            disabled={!includeHoa}
                          />
                        </Col>
                        <Col sm={2}>
                          <Form.Check
                            type="checkbox"
                            label="Include"
                            checked={includeHoa}
                            onChange={(e) => setIncludeHoa(e.target.checked)}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={6}>Other Costs ($/year)</Form.Label>
                        <Col sm={4}>
                          <Form.Control
                            type="number"
                            value={otherCosts}
                            onChange={(e) => setOtherCosts(e.target.value)}
                            min="0"
                            disabled={!includeOtherCosts}
                          />
                        </Col>
                        <Col sm={2}>
                          <Form.Check
                            type="checkbox"
                            label="Include"
                            checked={includeOtherCosts}
                            onChange={(e) => setIncludeOtherCosts(e.target.checked)}
                          />
                        </Col>
                      </Form.Group>

                      <Button variant="primary" type="submit" className="w-100">
                        Calculate Monthly Payment
                      </Button>
                    </Form>
                  </Col>

                  <Col sm={12} md={6}>
                    {monthlyPayment && (
                      <>
                        <div className="mt-4 text-center">
                          <h3>Monthly Payment</h3>
                          <p style={{ fontSize: '24px', color: '#28a745' }}>
                            ${monthlyPayment}
                          </p>
                        </div>
                        <PieChart
                          height={300}
                          series={[
                            {
                              data: monthlyPaymentChartData,
                              innerRadius: 65,
                              arcLabel: (params) => params.label ?? '',
                              arcLabelMinAngle: 20,
                              valueFormatter,
                            },
                          ]}
                          skipAnimation
                        />
                      </>
                    )}
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MortgageCalculator;