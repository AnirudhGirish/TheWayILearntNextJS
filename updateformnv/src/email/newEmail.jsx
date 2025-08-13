import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Row,
    Section,
    Tailwind,
    Text,
  } from '@react-email/components';
  
  export const MembershipEmail = ({name, transaction, amount}) => {
    return (
      <Html>
        <Head />
        <Tailwind>
          <Preview>NVPSA | Payment success and Membership Confirmation</Preview>
          <Body className="min-h-screen flex items-center justify-center bg-blue-300 shadow-md rounded-lg text-black px-6 py-10">
            <Container className="bg-blue-200 shadow-lg rounded-lg p-10 w-full max-w-lg">
              <Heading className="text-center mt-4 leading-8 text-xl mb-10">
              Nutan Vidyalaya Past Students Association
              </Heading>
  
              <Section>
                <Row>
                  <Text className="text-lg my-6 text-gray-800">
                    Hello, {name}
                  </Text>
  
                  <Text className="text-lg my-6 text-gray-800">Welcome to NVPSA</Text>
                </Row>
              </Section>

              <Section>
                <Row>
                  <Text className="text-lg my-6 text-gray-800">
                    Congratulations! Your payment was successfull and NVPSA Membership is confirmed.
                  </Text>
  
                  <Text className="text-lg my-6 text-gray-800">Thankyou for registring.</Text>
                </Row>
              </Section>
  
              <Section className="text-center">
                <Row>
                    <Text className="bg-blue-300 text-black rounded-lg py-3 px-3">
                    Your Transaction ID is: {transaction}
                    </Text>
                </Row>
              </Section>
              
              <Section>
                <Row>
                    <Text className="text-center text-gray-900 my-30 text-md">
                    NVPSA Office, Nutan Vidyalaya Campus, Kalaburgi, India - 585102
                    </Text>
                </Row>
              </Section>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  };
  
  export default MembershipEmail;