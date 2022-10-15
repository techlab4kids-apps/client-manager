import React from "react";
import {
    Box,
    Container,
    Row,
    Column,
    FooterLink,
    Heading,
} from "./FooterStyles";

const Footer = () => {
    return (
        <Box>
            <h1>
                TechLAB4Kids.it
            </h1>
            <Container>
                <Row>
                    <Column>
                        <Heading>Per contattarci</Heading>
                        <FooterLink href="mailto://info@techlab4kids.it">info@techlab4kids.it</FooterLink>
                    </Column>
                    <Column>
                        <Heading>Social Media</Heading>
                        <FooterLink href="https://facebook.com/techlab4kids">
                            <i className="fab fa-facebook-f">
				<span style={{ marginLeft: "10px" }}>
				Facebook
				</span>
                            </i>
                        </FooterLink>
                        <FooterLink href="https://techlab4kids.it">
                            <i className="fab fa-instagram">
				<span style={{ marginLeft: "10px" }}>
				techlab4kids.it
				</span>
                            </i>
                        </FooterLink>
                    </Column>
                </Row>
            </Container>
        </Box>
    );
};
export default Footer;
