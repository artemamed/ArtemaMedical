import { Button } from '@/components/ui/button';
import { Container, Section, Column, Row, Text } from '@react-email/components';
import { User } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";

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
        <Container className=" p-5">
            <div className="space-y-5">
                <Section>
                    <div className=" flex justify-center items-center mx-auto border-b-2 w-4/5  border-gray-200 ">
                        <Image src="/artema-logo.png" alt="Company Logo" height="150" width="150" className='object-cover' />
                    </div>
                    <div className="text-xl font-bold text-teal-900 mt-3 text-center">Your order has been confirmed</div>
                    <div className="text-sm mt-1 text-teal-800 font-semibold text-center">Order # {orderId}</div>
                    <div className='bg-gray-100 py-4 px-5 rounded-lg mt-[1.5rem]'>
                        <span className="text-base text-gray-600 flex mb-2">Hey {firstName} {lastName},</span>
                        <span className="text-sm text-gray-600">
                            We are delighted to confirm that your order has been successfully placed.
                            Thank you for choosing Artema Medical Group as your trusted provider for high-quality surgical instruments.
                        </span>
                    </div>
                </Section>

                <Section>
                    <div className="text-md font-semibold text-gray-800 mb-2"><User className='inline-block mr-1 h-5' />Client Info</div>
                    <div className='grid grid-cols-2'>
                        <span className="text-sm text-gray-500">{firstName} {lastName}</span>
                        <span className="text-sm text-gray-500">Phone: {contactNumber}</span>

                        <span className="text-sm text-gray-500">
                            {shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state},
                            {shippingAddress.zipCode}, {shippingAddress.country}
                        </span>
                        <span className="text-sm text-gray-500">Email Address: <span className='text-blue-400'>{emailAddress}</span></span>
                    </div>
                </Section>

                <Section>
                    <div className="flex items-center bg-gray-100 px-4 pr-10 border-l-8 border-teal-600 my-4">
                        <span className="text-md font-bold text-gray-800">Order Details</span>
                        <Image src="/package.png" alt="Package Icon" height={80} width={80} className="ml-auto" />
                    </div>

                    <Row className="p-2 font-medium text-sm">
                        <Column className="p-2 w-[3rem] text-center">Sr.</Column>
                        <Column className="p-2 flex-1">Items</Column>
                        <Column className="p-2 w-[5rem] text-center">Size</Column>
                        <Column className="p-2 w-[7rem] text-center">SKU</Column>
                        <Column className="p-2 w-[4rem] text-center">Qty</Column>
                        <Column className="p-2 w-[6rem] text-right">Price</Column>
                    </Row>
                    <div className='border-b-2 border-gray-200'>
                        {items.map((item, index) => (
                            <Row key={index} className="p-2 text-xs">
                                <Column className="p-2 w-[3rem] text-center">{index + 1}</Column>
                                <Column className="p-2 flex-1">{item.name}</Column>
                                <Column className="p-2 w-[5rem] text-center">{item.size}</Column>
                                <Column className="p-2 w-[7rem] text-center">{item.sku}</Column>
                                <Column className="p-2 w-[4rem] text-center">{item.quantity}</Column>
                                <Column className="p-2 w-[6rem] text-right">${item.price}</Column>
                            </Row>
                        ))}
                    </div>

                    {/* Total Section - Bottom Right Aligned */}
                    <div className="flex justify-end mt-[3rem]">
                        <div className="w-[20rem] text-right space-y-2 ">
                            <div className="flex justify-between pb-1 text-gray-500 text-sm">
                                <span className="">Subtotal:</span>
                                <span>${subTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between pb-1 text-gray-500 text-sm">
                                <span className="">Freight Charges:</span>
                                <span>${freight.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between pb-1 text-gray-500 text-sm">
                                <span className="">Tax:</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between border-t pt-2 text-lg font-semibold">
                                <span>Grand Total:</span>
                                <span>${grandTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </Section>

                <Section className="text-center text-xl flex flex-col items-center py-[3rem]">
                    <div className=" font-bold mb-2">Need Help?</div>
                    <Text className="text-sm text-gray-500">
                        Should you have any questions or require further assistance, our team is here to help.
                    </Text>
                    <Button asChild className='px-[3rem]'>
                        <Link href="mailto:sales@artemamed.com">CONTACT US</Link>
                    </Button>
                </Section>

                <footer className='text-center w-full bg-gray-50'>
                    <div className='text-[10px] text-gray-500'>
                        You&apos;ll receive a shipping notification as soon as your order has been dispatched, with complete tracking number so you can follow your journey to your doorstep. You can reach us anytime at <span className='text-blue-500'>sales@artemamed.com</span>
                        7901 4th St. N STE 10963, Saint Peterburg, Florida, 3370.
                    </div>
                    <div className='mt-[1rem] text-xs'>
                        This email was sent by: noreply@gmail.com
                    </div>
                </footer>
            </div>
        </Container>
    );
};
export default OrderConfirmationEmail;