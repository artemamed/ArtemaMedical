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
        <Container style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <Section style={{ marginBottom: '20px' }}>
                <div style={{ textAlign: 'center', borderBottom: '2px solid #e2e8f0', width: '100%', margin: '0 auto' }}>
                    <Img src="/artema-logo.png" alt="Company Logo" style={{ height: '150px', width: '150px', objectFit: 'cover' }} />
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#134e4a', marginTop: '15px', textAlign: 'center' }}>Your order has been confirmed</div>
                <div style={{ fontSize: '14px', marginTop: '5px', color: '#115e59', fontWeight: '600', textAlign: 'center' }}>Order # {orderId}</div>
                <div style={{ backgroundColor: '#f3f4f6', padding: '16px 20px', borderRadius: '8px', marginTop: '24px' }}>
                    <span style={{ fontSize: '16px', color: '#4b5563', marginBottom: '8px', display: 'block' }}>Hey {firstName} {lastName},</span>
                    <span style={{ fontSize: '14px', color: '#4b5563' }}>
                        We are delighted to confirm that your order has been successfully placed.
                        Thank you for choosing Artema Medical Group as your trusted provider for high-quality surgical instruments.
                    </span>
                </div>
            </Section>

            <Section style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>👤 Client Info</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>{firstName} {lastName}</span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>Phone: {contactNumber}</span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                        {shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state},
                        {shippingAddress.zipCode}, {shippingAddress.country}
                    </span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>Email Address: <span style={{ color: '#60a5fa' }}>{emailAddress}</span></span>
                </div>
            </Section>

            <Section style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f3f4f6', padding: '16px', borderLeft: '8px solid #0d9488', marginBottom: '16px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937' }}>Order Details</span>
                    <Img src="/package.png" alt="Package Icon" style={{ height: '80px', width: '80px', marginLeft: 'auto' }} />
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
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '48px' }}>
                    <div style={{ width: '320px', textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '4px', color: '#6b7280', fontSize: '14px' }}>
                            <span>Subtotal:</span>
                            <span>${subTotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '4px', color: '#6b7280', fontSize: '14px' }}>
                            <span>Freight Charges:</span>
                            <span>${freight.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '4px', color: '#6b7280', fontSize: '14px' }}>
                            <span>Tax:</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '8px', fontSize: '18px', fontWeight: '600' }}>
                            <span>Grand Total:</span>
                            <span>${grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </Section>

            <Section style={{ textAlign: 'center', padding: '48px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Need Help?</div>
                <Text style={{ fontSize: '14px', color: '#6b7280' }}>
                    Should you have any questions or require further assistance, our team is here to help.
                </Text>
                <a href="mailto:sales@artemamed.com" style={{ backgroundColor: '#0d9488', color: '#ffffff', padding: '12px 48px', borderRadius: '4px', textDecoration: 'none', marginTop: '16px' }}>CONTACT US</a>
            </Section>

            <footer style={{ textAlign: 'center', width: '100%', backgroundColor: '#f9fafb', padding: '16px 0' }}>
                <div style={{ fontSize: '10px', color: '#6b7280' }}>
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