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
            "https://test-bankalfalah.gateway.mastercard.com/api/rest/version/84/merchant/TESTARTEMA/session",
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${Buffer.from(
                        `merchant.TESTARTEMA:25e46eaf387cb8c8a6af46b1cf16f9f3`
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
