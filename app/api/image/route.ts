import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { auth } from "@clerk/nextjs";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
  role: 'system',
  content: 'You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.'
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = '512x512' } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("API Key not configured.", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required.", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("Amount is required.", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("Resolution is required.", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial expired", { status: 403 });
    }

    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution
    });

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.error("[Image Error]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}