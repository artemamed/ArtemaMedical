// components/email/index.tsx

import { Container, Section, Column, Row, Text, Img } from '@react-email/components';
import * as React from 'react';

interface OrderConfirmationEmailProps {
    orderId: string;
    firstName: string;
    lastName: string;
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    contactNumber: string;
    emailAddress: string;
    items: Array<{
        name: string;
        size: string;
        sku: string;
        quantity: number;
        price: number;
    }>;
}

const OrderConfirmationEmail = ({
    orderId = "0123456789",
    firstName = "Anas",
    lastName = "Ansari",
    shippingAddress = {
        street: "House No.45, Street No.7, DHA",
        city: "Lahore",
        state: "Punjab",
        zipCode: "54000",
        country: "Pakistan",
    },
    contactNumber = "321 1234567",
    emailAddress = "anas@artemamed.com",
    items = [
        {
            name: "Universal Handle for laryngeal forceps acc to Huber",
            size: "17.5 cm",
            sku: "026-0581-01",
            quantity: 2,
            price: 155,
        },
        {
            name: "Handle for laryngeal forceps acc to Huber",
            size: "18 cm",
            sku: "026-0581-01",
            quantity: 1,
            price: 245,
        },
    ],
}: OrderConfirmationEmailProps) => {
    // Calculate subtotal
    const subTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Calculate freight charges
    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
    const freight = totalQuantity === 1 ? 25 : 75;

    // Calculate tax (6.2% of subtotal)
    const tax = subTotal * 0.062;

    // Calculate grand total
    const grandTotal = subTotal + freight + tax;

    return (
        <Container style={{ width: '90%', maxWidth: '800px', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <Section style={{ width: '100%', maxWidth: '800px', marginBottom: '20px' }}>
                <div style={{ textAlign: 'center', borderBottom: '2px solid #e2e8f0', width: '80%', margin: '0 auto' }}>
                    <Img src="https://artemamed.com/artema-logo.png" alt="Company Logo" style={{ height: '200px', width: '200px', objectFit: 'contain', display: 'block', margin: '0 auto' }} />
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#134e4a', marginTop: '15px', textAlign: 'center' }}>Your order has been confirmed</div>
                <div style={{ fontSize: '14px', marginTop: '5px', color: '#115e59', fontWeight: '600', textAlign: 'center' }}>Order # {orderId}</div>
                <div style={{ backgroundColor: '#f3f4f6', padding: '16px 20px', borderRadius: '8px', marginTop: '24px' }}>
                    <span style={{ fontSize: '16px', color: '#4b5563', marginBottom: '8px', display: 'block' }}>Hey {firstName} {lastName},</span>
                    <span style={{ fontSize: '14px', color: '#4b5563' }}>
                        We are delighted to confirm that your order has been successfully placed. Thank you for choosing Artema Medical Group as your trusted provider for high-quality surgical instruments. Our team will be in touch with you shortly. If you have any questions in the meantime, feel free to contact us. Looking forward to your response!
                    </span>
                </div>
            </Section>

            <Section style={{ width: '100%', maxWidth: '800px', marginBottom: '20px' }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>👤 Client Info</div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', gap: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>{firstName} {lastName}</span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>Phone: {contactNumber}</span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                        {shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state},
                        {shippingAddress.zipCode}, {shippingAddress.country}
                    </span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>Email Address: <span style={{ color: '#90CAF9' }}>{emailAddress}</span></span>
                </div>
            </Section>

            <Section style={{ width: '100%', maxWidth: '800px', marginBottom: '20px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#f3f4f6',
                    borderLeft: '16px solid #0d9488',
                    marginBottom: '16px',
                    position: 'relative', // Enable absolute positioning for the image
                    height: '70px', // Fixed height to prevent expansion
                    overflow: 'visible' // Allow image to overgrow
                }}>
                    <span style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#1f2937',
                        flex: 1,
                        marginLeft: '20px',
                        marginTop: '20px'
                    }}>
                        Order Details
                    </span>
                    <Img
                        src="https://artemamed.com/package.png"
                        alt="Package Icon"
                        style={{
                            height: '100px',  // Larger than the div
                            width: '100px',
                            position: 'absolute',
                            marginLeft: 'auto',
                            transform: 'translateY(-50%)' // Keep it centered vertically
                        }}
                    />
                </div>


                <Row style={{ padding: '8px', fontWeight: '500', fontSize: '14px' }}>
                    <Column style={{ padding: '8px', width: '48px', textAlign: 'center' }}>Sr.</Column>
                    <Column style={{ padding: '8px', flex: '1' }}>Items</Column>
                    <Column style={{ padding: '8px', width: '80px', textAlign: 'center' }}>Size</Column>
                    <Column style={{ padding: '8px', width: '112px', textAlign: 'center' }}>SKU</Column>
                    <Column style={{ padding: '8px', width: '64px', textAlign: 'center' }}>Qty</Column>
                    <Column style={{ padding: '8px', width: '96px', textAlign: 'right' }}>Price</Column>
                </Row>
                <div style={{ borderBottom: '2px solid #e2e8f0' }}>
                    {items.map((item, index) => (
                        <Row key={index} style={{ padding: '8px', fontSize: '12px' }}>
                            <Column style={{ padding: '8px', width: '48px', textAlign: 'center' }}>{index + 1}</Column>
                            <Column style={{ padding: '8px', flex: '1' }}>{item.name}</Column>
                            <Column style={{ padding: '8px', width: '80px', textAlign: 'center' }}>{item.size}</Column>
                            <Column style={{ padding: '8px', width: '112px', textAlign: 'center' }}>{item.sku}</Column>
                            <Column style={{ padding: '8px', width: '64px', textAlign: 'center' }}>{item.quantity}</Column>
                            <Column style={{ padding: '8px', width: '96px', textAlign: 'right' }}>${item.price}</Column>
                        </Row>
                    ))}
                </div>

                {/* Total Section - Bottom Right Aligned */}
                <table style={{ width: "320px", marginTop: "48px", marginLeft: "auto", borderCollapse: "collapse" }}>
                    <tbody>
                        <tr style={{ color: "#6b7280", fontSize: "14px" }}>
                            <td style={{ textAlign: "left", paddingBottom: "4px" }}>Subtotal:</td>
                            <td style={{ textAlign: "right", paddingBottom: "4px" }}>${subTotal.toFixed(2)}</td>
                        </tr>
                        <tr style={{ color: "#6b7280", fontSize: "14px" }}>
                            <td style={{ textAlign: "left", paddingBottom: "4px" }}>Freight Charges:</td>
                            <td style={{ textAlign: "right", paddingBottom: "4px" }}>${freight.toFixed(2)}</td>
                        </tr>
                        <tr style={{ color: "#6b7280", fontSize: "14px" }}>
                            <td style={{ textAlign: "left", paddingBottom: "4px" }}>Tax:</td>
                            <td style={{ textAlign: "right", paddingBottom: "4px" }}>${tax.toFixed(2)}</td>
                        </tr>
                        <tr style={{ borderTop: "1px solid #e2e8f0", fontSize: "18px", fontWeight: "600" }}>
                            <td style={{ textAlign: "left", paddingTop: "8px" }}>Grand Total:</td>
                            <td style={{ textAlign: "right", paddingTop: "8px" }}>${grandTotal.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </Section>

            <Section style={{ padding: "48px 0", textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>Need Help?</div>
                <Text style={{ fontSize: "14px", color: "#6b7280" }}>
                    Should you have any questions or require further assistance, our team is here to help.
                </Text>
                <table role="presentation" style={{ margin: "16px auto" }}>
                    <tr>
                        <td>
                            <a
                                href="mailto:sales@artemamed.com"
                                style={{
                                    backgroundColor: "#0d9488",
                                    color: "#ffffff",
                                    padding: "12px 48px",
                                    borderRadius: "4px",
                                    textDecoration: "none",
                                    display: "inline-block",
                                }}
                            >
                                CONTACT US
                            </a>
                        </td>
                    </tr>
                </table>
            </Section>


            <footer style={{ textAlign: 'center', width: '100%', backgroundColor: '#f9fafb', padding: '16px 0' }}>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    You&apos;ll receive a shipping notification as soon as your order has been dispatched, with complete tracking number so you can follow your journey to your doorstep. You can reach us anytime at <span style={{ color: '#3b82f6' }}>sales@artemamed.com</span>
                    7901 4th St. N STE 10963, Saint Peterburg, Florida, 3370.
                </div>
                <div style={{ marginTop: '16px', fontSize: '12px' }}>
                    This email was sent by: noreply@gmail.com
                </div>
            </footer>
        </Container>
    );
};

export default OrderConfirmationEmail;