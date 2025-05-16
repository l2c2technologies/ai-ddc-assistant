# AI-Powered DDC23 Suggestions Assistant for Koha

## Foreword

This tiny "side project" is meant to be more of a "academic toy" rather than a serious product. Personally speaking, I'm not in favor of *solely* using GenAI for finding out DDC class numbers, given the frequent bouts of "hallucinations" being so common with current AI models. Also, getting accurate results can be difficult for digital bibliographic records that are short on metadata. As my good friend and senior - [Prof. Parthasarathi Mukhopadhyay](https://www.linkedin.com/in/parthasarathi-mukhopadhyay-68a73417/) mentioned recently on FB - we need to look beyond off-the-shelf LLM models; to satisfy the needs of the user community along with the need for accuracy and being mindful of the biases, exploring RAG (Retrieval-Augmented Generation) by taking help of validated corpora is one of the possible way forward. I concur.

However, several readers of our blog, our clients and partners and friends in the Indian LIS community have been long asking me for something of this nature, especially since OCLC closed down the free OCLC Classify service in 2022. To be fair to OCLC, the project started as an experimental FRBR based classification service in 2008. It was never meant to be a long-term project. In fact OCLC gave a full 2 years of heads-up in announcing the project's planned shutdown in 2022.

So after enough people had managed to bug me, especially after Anupta's (Jana) FB post on the topic, I decided to put in a few hours effort and here it is - warts and all. So,

### What does this "toy" allow you to do

  * Experiment with over more than **270 LLM models** *(including variants)* from over **45 AI providers** and with more than **70 free models** *(daily usage quota may apply)* with just a single click of the mouse.
  * Study and compare the difference in output between the various models.
  * Learning more about the stochastic nature of AI output and also how we should not blindly depend on AI

**Note about "free" models** : Always remember "when the service is free, ***you*** are the product\!". At this juncture we in India should be mindful of the [The Digital Personal Data Protection Act (DPDP), 2023](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf) which is likely to kick in as a law on the land any day now.

Well, you people wanted this badly. So far, I do not agree with that view-point, but here it is\! Signing out with the words of Sukumar Ray (The GOAT) - "তারপরে যাও যেথায় খুশি, জ্বালিও নাকো মোরে" :wink:

---

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Overview

This is a jQuery-based helper snippet for the [Koha Integrated Library System (ILS)](https://koha-community.org/) that leverages generative AI models via the [OpenRouter.ai](https://openrouter.ai/) service to suggest Dewey Decimal Classification (DDC) numbers (based on the 23rd edition). The suggestions are generated based on the bibliographic record's title, author (implicitly through 245$c), ISBN, subject headings, and summary.

**GitHub Repository:** [https://github.com/l2c2technologies/koha-ai-ddc-assistant](https://github.com/l2c2technologies/koha-ai-ddc-assistant)

This script seamlessly integrates into Koha through the system preferences `IntranetUserJS` and `IntranetUserCSS` by using the code available [here](https://github.com/l2c2technologies/koha-ai-ddc-assistant/blob/main/koha-ai-ddc-assistant.js) and [here](https://github.com/l2c2technologies/koha-ai-ddc-assistant/blob/main/koha-ai-ddc-assistant.css).

## About OpenRouter

[OpenRouter](https://openrouter.ai/) is an aggregator that provides a single API to access various Large Language Models (LLMs) from different providers like OpenAI, Anthropic, Google, and others. This allows developers to easily experiment with and utilize different AI models through a unified interface.

## Important Notes Regarding OpenRouter

  * **Minimum Credit:** Even though OpenRouter.ai offers some free Large Language Models (LLMs), their platform requires a minimum credit balance of USD 5 in your account to use their services. For users in India, this might necessitate using a credit card on either the Visa or MasterCard network to add credits to your OpenRouter account.
  * **Rate Limits:** OpenRouter implements rate limits to ensure fair usage:
      * **Free Usage Limits:** For free model variants (model IDs ending in `:free`), you are limited to 20 requests per minute. Daily limits also apply: 50 requests per day if you've purchased less than 10 credits, and 1000 requests per day if you've purchased at least 10 credits.
      * **DDoS Protection:** Cloudflare's DDoS protection will block unusually high traffic.
      * **Paid Usage Limits:** For other requests, rate limits depend on your remaining credits: 1 request per credit per second, up to a surge limit (typically 500 requests per second).
      * **Negative Balance:** If your account has a negative credit balance, you may encounter `402` errors, even for free models. Adding credits to bring your balance above zero will restore access.
  * **Error Handling:** If there's an issue communicating with the OpenRouter API (e.g., invalid API key, insufficient credits, rate limiting, or service outage), an error message will be displayed.

    ![OpenRouter API Error](https://github.com/l2c2technologies/koha-ai-ddc-assistant/blob/main/screenshots/image3.png)

## Telemetry

This assistant captures operational data about the AI suggestion process and stores it in the MARC21 field **538 - System Details Note** ([https://www.loc.gov/marc/bibliographic/bd538.html](https://www.loc.gov/marc/bibliographic/bd538.html)). This data includes:

  * A note indicating that the DDC class number was AI-generated.
  * The name and ID of the AI model used.
  * The number of input and output tokens consumed during the API call.
  * The date and time of the AI generation.
  * The logged-in Koha username.
  * The borrowernumber of the logged-in user (if available).

This information helps in understanding the usage patterns and costs associated with the AI assistant at individual bibliographic record level.

![MARC 538 Telemetry Data](https://github.com/l2c2technologies/koha-ai-ddc-assistant/blob/main/screenshots/image5.png)

## Features

  * **AI-Powered Suggestions:** Uses various Large Language Models (LLMs) via OpenRouter to generate DDC23 suggestions.
  * **Model Selection:** Allows users to choose from a list of available LLMs, each with potentially different performance and cost.

    ![LLM Model Selection](https://github.com/l2c2technologies/koha-ai-ddc-assistant/blob/main/screenshots/image2.png)

  * **Contextual Prompting:** Constructs a detailed prompt for the AI using the bibliographic information available in the MARC fields (245$, 020$a, 520$a, 650$a).
  * **Clear Presentation:** Displays the AI-generated DDC suggestions in a modal dialog, highlighting the most suitable suggestion (if identified by the AI).

    ![DDC Suggestions Modal](https://github.com/l2c2technologies/koha-ai-ddc-assistant/blob/main/screenshots/image1.png)

  * **Integration with Koha:** Allows users to easily select a suggested DDC number, which will then populate the 082$a field in the bibliographic record within the Koha interface.
  * **AI Analysis View:** Provides an option to view the raw response from the AI model for better understanding of its reasoning.

    ![AI Analysis](https://github.com/l2c2technologies/koha-ai-ddc-assistant/blob/main/screenshots/image4.png)

  * **OpenRouter Credit Information:** Displays the user's OpenRouter API credit balance and usage. *(See Image 1 above)*
  * **Usage Tracking:** Records information about the AI model used and the token consumption in the 538$a field of the bibliographic record. *(See Image 5 above)*

## Prerequisites

To use this script within Koha, you need:

  * **Koha ILS Installation:** A working installation of the Koha Integrated Library System.
  * **Internet Connectivity:** The Koha server (or the user's browser) needs internet access to communicate with the OpenRouter API.
  * **OpenRouter API Key:** You will need an API key from [OpenRouter](https://openrouter.ai/) to access the AI models.
  * **OpenRouter Account with Minimum Credit:** Ensure your OpenRouter account has a minimum of USD 5 credit.

## Installation in Koha

This script is designed to be included in Koha's system preferences:

1.  Go to **Administration \> System preferences**.
2.  Search for "**IntranetUserJS**".
3.  Copy and paste the content from [here](https://github.com/l2c2technologies/koha-ai-ddc-assistant/blob/main/koha-ai-ddc-assistant.js) into the text area for the **IntranetUserJS** preference.
4.  Search for "**IntranetUserCSS**".
5.  Copy and paste the content from [here](https://github.com/l2c2technologies/koha-ai-ddc-assistant/blob/main/koha-ai-ddc-assistant.css) into the text area for the **IntranetUserCSS** preference.
6.  **Replace API Key:** Within the code you pasted into **IntranetUserJS**, **replace the placeholder OpenRouter API key**:

    ```javascript
    var openrouterApiKey = 'YOUR_OPENROUTER_API_KEY';
    ```
7.  Save the system preferences.

## Usage in Koha

1.  Navigate to the cataloging interface in your Koha intranet.
2.  You will see a "Get Dewey Suggestions" checkbox and a model selection dropdown near the title field. *(See Image 2)*
3.  Optionally, select an LLM model from the dropdown menu.
4.  Check the "Get Dewey Suggestions" checkbox.
5.  A modal dialog will appear with AI-generated DDC number suggestions, along with credit information and usage details. *(See Image 1)*
6.  Select a suggestion and click "Select" to populate the 082$a field. The 538 field will also be updated with telemetry data. *(See Image 5)*
7.  To understand the AI's reasoning, click the "here" link in the modal to view the AI Analysis. *(See Image 4)*

**Note:** This code will function correctly regardless of whether the MARC21 fields required for generating prompts and for updating with the selected DDC number are located within the same tab or across separate tabs in your Koha cataloging interface. The only prerequisite is that the specific MARC21 field and subfield must exist within your Koha's MARC21 framework.

## Configuration

  * **`modelData` Array:** You can modify the `modelData` array in the **IntranetUserJS** to customize the list of available LLMs.
  * **Default Model:** If you don't choose a model, this code will by default use Meta's LLaMA 4 Maverick (`meta-llama/llama-4-maverick`). **Note:** This is a paid model.

## License

This project is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.txt).

## Author

Indranil Das Gupta \<[indradg@l2c2.co.in](mailto:indradg@l2c2.co.in)\>

## Version

2025.05.1\_GA

## Date

2025-05-15
