import { Card, CardBody, CardHeader, CardText, CardTitle, Col, Container } from 'react-bootstrap';
import { calculators } from './layout';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Container>
          <Col sm={12} className="text-center">
            {
              calculators.map((calculator) => (
                <Card
                  bg={'dark'}
                  key={calculator.name}
                  text={'white'}
                  style={{ width: '18rem' }}
                  className="mb-2"
                >
                  <CardHeader>{calculator.name}</CardHeader>
                  <CardBody>
                    <CardTitle>{calculator.subheading}</CardTitle>
                    <CardText>
                      {calculator.description}.
                    </CardText>
                  </CardBody>
                </Card>
              ))
            }
          </Col>
        </Container>
      </main>
    </div>
  );
}
