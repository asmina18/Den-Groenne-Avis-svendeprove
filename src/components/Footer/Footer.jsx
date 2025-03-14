import React from 'react';
import styles from '../Footer/Footer.module.scss';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

/**
 * 🔹 Komponent: Footer
 * - Viser information om nyhedsbrev, kontakt og FN’s Verdensmål.
 */
export const Footer = () => {
  return (
    <footer className={styles.footer} aria-label="Footer">
      <Container>
        <Row className={styles.footerRow}>

          {/* 🔹 Nyhedsbrev */}
          <Col md={4} className={styles.section}>
            <section>
              <h3>Nyhedsbrev</h3>
              <p>Vil du være med på den grønne front? Tilmeld dig vores nyhedsbrev og få de seneste klimaopdateringer direkte i din indbakke.</p>
              <Form className={styles.newsletterForm}>
                <Form.Label htmlFor="newsletter-email" className="visually-hidden">Indtast din e-mail</Form.Label>
                <Form.Control
                  type="email"
                  id="newsletter-email"
                  placeholder="Din e-mail"
                  className={styles.input}
                  required
                  aria-label="Indtast din e-mail for at tilmelde dig nyhedsbrevet"
                />
                <Button type="submit" className={styles.button}>Tilmeld</Button>
              </Form>
            </section>
          </Col>

          {/* 🔹 Kontaktinformation */}
          <Col md={4} className={styles.section}>
            <section>
              <h3>Kontakt</h3>
              <address>
                <p>Redningen 32<br />2210 Vesterby Øster</p>
                <p>+45 88229422</p>
                <p>
                  <a href="mailto:dga@info.dk" className={styles.links}>dga@info.dk</a>
                </p>
              </address>
            </section>
          </Col>

          {/* 🔹 FN’s Verdensmål */}
          <Col md={4} className={styles.section}>
            <section>
              <h3>FN’s Verdensmål</h3>
              <p>Vi støtter på organisatorisk plan op om FN’s verdensmål og har derfor besluttet, at en del af overskuddet går direkte til verdensmål nr. 13: Klimahandling.</p>
              <a
                href="https://www.verdensmaalene.dk/"
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Læs mere om verdensmålene her
              </a>
            </section>
          </Col>

        </Row>
      </Container>
    </footer>
  );
};
