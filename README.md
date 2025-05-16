# AI-Powered DDC23 Suggestions Assistant for Koha

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Overview

This is a jQuery-based helper snippet for the [Koha Integrated Library System (ILS)](https://koha-community.org/) that leverages generative AI models via the [OpenRouter.ai](https://openrouter.ai/) service to suggest Dewey Decimal Classification (DDC) numbers (based on the 23rd edition). The suggestions are generated based on the bibliographic record's title, author (implicitly through 245$c), ISBN, subject headings, and summary.

**GitHub Repository:** [https://github.com/l2c2technologies/koha-ai-ddc-assistant](https://github.com/l2c2technologies/koha-ai-ddc-assistant)

**GitHub Project Summary:** JQuery based helper snippet for Koha ILS for using generative AI via OpenRouter.ai service for Dewey Decimal Classification number suggestions based on title, author, isbn, subject headings and summary.

This script seamlessly integrates into Koha through the system preferences **IntranetUserJS** and **IntranetUserCSS**.

The JavaScript inclusion snippet is available at: [https://github.com/l2c2technologies/koha-ai-ddc-assistant/blob/main/koha-ai-ddc-assistant.js](https://github.com/l2c2technologies/koha-ai-ddc-assistant/blob/main/koha-ai-ddc-assistant.js)

The CSS inclusion snippet is available at: [https://github.com/l2c2technologies/koha-ai-ddc-assistant/blob/main/koha-ai-ddc-assistant.css](https://github.com/l2c2technologies/koha-ai-ddc-assistant/blob/main/koha-ai-ddc-assistant.css)

## About OpenRouter

[OpenRouter](https://openrouter.ai/) is an aggregator that provides a single API to access various Large Language Models (LLMs) from different providers like OpenAI, Anthropic, Google, and others. This allows developers to easily experiment with and utilize different AI models through a unified interface.

## Important Notes Regarding OpenRouter

* **Minimum Credit:** Even though OpenRouter.ai offers some free Large Language Models (LLMs), their platform requires a minimum credit balance of USD 5 in your account to use their services. For users in India, this might necessitate using a credit card on either the Visa or MasterCard network to add credits to your OpenRouter account.
* **Rate Limits:** OpenRouter implements rate limits to ensure fair usage:
    * **Free Usage Limits:** For free model variants (model IDs ending in `:free`), you are limited to 20 requests per minute. Daily limits also apply: 50 requests per day if you've purchased less than 10 credits, and 1000 requests per day if you've purchased at least 10 credits.
    * **DDoS Protection:** Cloudflare's DDoS protection will block unusually high traffic.
    * **Paid Usage Limits:** For other requests, rate limits depend on your remaining credits: 1 request per credit per second, up to a surge limit (typically 500 requests per second).
    * **Negative Balance:** If your account has a negative credit balance, you may encounter `402` errors, even for free models. Adding credits to bring your balance above zero will restore access.

## Telemetry

This assistant captures operational data about the AI suggestion process and stores it in the MARC21 field **538 - System Details Note** ([https://www.loc.gov/marc/bibliographic/bd538.html](https://www.loc.gov/marc/bibliographic/bd538.html)). This data includes:

* A note indicating that the DDC class number was AI-generated.
* The name and ID of the AI model used.
* The number of input and output tokens consumed during the API call.
* The date and time of the AI generation.
* The logged-in Koha username.
* The borrowernumber of the logged-in user (if available).

This information helps in understanding the usage patterns and costs associated with the AI assistant at individual bibliographic record level.

## Features

* **AI-Powered Suggestions:** Uses various Large Language Models (LLMs) via OpenRouter to generate DDC23 suggestions.
* **Model Selection:** Allows users to choose from a list of available LLMs, each with potentially different performance and cost.
* **Contextual Prompting:** Constructs a detailed prompt for the AI using the bibliographic information available in the MARC fields (245$, 020$a, 520$a, 650$a).
* **Clear Presentation:** Displays the AI-generated DDC suggestions in a modal dialog, highlighting the most suitable suggestion (if identified by the AI).
* **Integration with Koha:** Allows users to easily select a suggested DDC number, which will then populate the 082$a field in the bibliographic record within the Koha interface.
* **AI Analysis View:** Provides an option to view the raw response from the AI model for better understanding of its reasoning.
* **OpenRouter Credit Information:** Displays the user's OpenRouter API credit balance and usage.
* **Usage Tracking:** Records information about the AI model used and the token consumption in the 538$a field of the bibliographic record.

## Prerequisites

To use this script within Koha, you need:

* **Koha ILS Installation:** A working installation of the Koha Integrated Library System.
* **Internet Connectivity:** The Koha server (or the user's browser) needs internet access to communicate with the OpenRouter API.
* **OpenRouter API Key:** You will need an API key from [OpenRouter](https://openrouter.ai/) to access the AI models.
* **OpenRouter Account with Minimum Credit:** Ensure your OpenRouter account has a minimum of USD 5 credit.

Koha should already include jQuery. You might need to ensure Bootstrap and Select2 are available or include their CDN links if they are not standard in your Koha setup. Font Awesome is also used for icons.

## Installation in Koha

This script is designed to be included in Koha's system preferences:

1.  Go to **Administration > System preferences**.
2.  Search for "**IntranetUserJS**".
3.  Copy and paste the content of [https://github.com/l2c2technologies/koha-ai-ddc-assistant/blob/main/koha-ai-ddc-assistant.js](https://github.com/l2c2technologies/koha-ai-ddc-assistant/blob/main/koha-ai-ddc-assistant.js) into the text area for the **IntranetUserJS** preference.
4.  Search for "**IntranetUserCSS**".
5.  Copy and paste the content of [https://github.com/l2c2technologies/koha-ai-ddc-assistant/blob/main/koha-ai-ddc-assistant.css](https://github.com/l2c2technologies/koha-ai-ddc-assistant/blob/main/koha-ai-ddc-assistant.css) into the text area for the **IntranetUserCSS** preference.
6.  **Replace API Key:** Within the code you pasted into **IntranetUserJS**, **replace the placeholder OpenRouter API key**:

    ```javascript
    var openrouterApiKey = 'YOUR_OPENROUTER_API_KEY';
    ```

7.  Save the system preferences.

## Usage in Koha

1.  Navigate to the cataloging interface in your Koha intranet.
2.  When adding or editing a bibliographic record, you will see a "Get Dewey Suggestions" checkbox near the title field.
3.  Optionally, select an LLM model from the dropdown menu.
4.  Check the "Get Dewey Suggestions" checkbox.
5.  A modal dialog will appear with AI-generated DDC number suggestions.
6.  Select a suggestion and click "Select" to populate the 082$a field. The 538 field will also be updated with telemetry data.

## Configuration

* **`modelData` Array:** You can modify the `modelData` array in the **IntranetUserJS** to customize the list of available LLMs.
* **Default Model:** If you don't choose a model, this code will by default use Meta's LLaMA 4 Maverick (`meta-llama/llama-4-maverick`). **Note:** This is a paid model.

## License

This project is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.txt).

## Author

Indranil Das Gupta <<indradg@l2c2.co.in>>

## Version

2025.05.1\_GA

## Date

2025-05-15
