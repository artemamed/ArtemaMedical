import axios from "axios";
import { NextResponse } from "next/server";

interface PaymentPayload {
    apiOperation: string;
    checkoutMode: string;
    interaction: {
        operation: string;
        merchant: {
            name: string;
            url: string;
        };
    };
    order: {
        currency: string;
        amount: number;
        id: string;
        description: string;
    };
    paymentLink: {
        expiryDateTime: string;
        numberOfAllowedAttempts: string;
    };
}

export async function POST(request: Request) {
    try {
        const payload: PaymentPayload = await request.json();
        const response = await axios.post(
            "https://bankalfalah.gateway.mastercard.com/api/rest/version/84/merchant/ARTEMAMEDICA/session",
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${Buffer.from(
                        `merchant.ARTEMAMEDICA:5d245bae704ba8a34ee40ad35beac255`
                    ).toString("base64")}`,
                },
            }
        );

        // Pass the payment link URL back to the client
        return NextResponse.json({ paymentLink: response.data.paymentLink });
    } catch (error) {
        return NextResponse.json(
            { error: axios.isAxiosError(error) ? error.response?.data : "Unknown error" },
            { status: 500 }
        );
    }
}
