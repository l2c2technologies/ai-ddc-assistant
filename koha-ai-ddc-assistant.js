/*
  ======================================================
  Name        : AI based DDC23 suggestions assistant
  Version     : 2025.05.1_GA
  Date        : 2025-05-15
  Author      : Indranil Das Gupta <indradg@l2c2.co.in>
  License     : https://www.gnu.org/licenses/gpl-3.0.txt 
  ======================================================
*/

$(document).ready(function() {
    const modelData = [
      { group: "THUDM", name: "GLM Z1 Rumination 32B - Input (1M) - $0.24 | Output (1M) - $0.24 | Context (token) - 32000", value: "thudm/glm-z1-rumination-32b" },
      { group: "01.AI", name: "Yi Large - Input (1M) - $3 | Output (1M) - $3 | Context (token) - 32768", value: "01-ai/yi-large" },
      { group: "Aetherwiing", name: "Starcannon 12B - Input (1M) - $0.80 | Output (1M) - $1.20 | Context (token) - 16384", value: "aetherwiing/mn-starcannon-12b" },
      { group: "Agentica", name: "Deepcoder 14B Preview (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 96000", value: "agentica-org/deepcoder-14b-preview:free" },
      { group: "AI21", name: "Jamba 1.6 Large - Input (1M) - $2 | Output (1M) - $8 | Context (token) - 256000", value: "ai21/jamba-1.6-large" },
      { group: "AI21", name: "Jamba Mini 1.6 - Input (1M) - $0.20 | Output (1M) - $0.40 | Context (token) - 256000", value: "ai21/jamba-1.6-mini" },
      { group: "AI21", name: "Jamba Instruct - Input (1M) - $0.50 | Output (1M) - $0.70 | Context (token) - 256000", value: "ai21/jamba-instruct" },
      { group: "AionLabs", name: "Aion-1.0 - Input (1M) - $4 | Output (1M) - $8 | Context (token) - 131072", value: "aion-labs/aion-1.0" },
      { group: "AionLabs", name: "Aion-1.0-Mini - Input (1M) - $0.70 | Output (1M) - $1.40 | Context (token) - 131072", value: "aion-labs/aion-1.0-mini" },
      { group: "AionLabs", name: "Aion-RP 1.0 (8B) - Input (1M) - $0.20 | Output (1M) - $0.20 | Context (token) - 32768", value: "aion-labs/aion-rp-llama-3.1-8b" },
      { group: "AlfredPros", name: "CodeLLaMa 7B Instruct Solidity - Input (1M) - $0.80 | Output (1M) - $1.20 | Context (token) - 4096", value: "alfredpros/codellama-7b-instruct-solidity" },
      { group: "Amazon", name: "Nova Lite 1.0 - Input (1M) - $0.06 | Output (1M) - $0.24 | Context (token) - 300000", value: "amazon/nova-lite-v1" },
      { group: "Amazon", name: "Nova Micro 1.0 - Input (1M) - $0.035 | Output (1M) - $0.14 | Context (token) - 128000", value: "amazon/nova-micro-v1" },
      { group: "Amazon", name: "Nova Pro 1.0 - Input (1M) - $0.80 | Output (1M) - $3.20 | Context (token) - 300000", value: "amazon/nova-pro-v1" },
      { group: "Anthropic", name: "Claude 3.7 Sonnet - Input (1M) - $3 | Output (1M) - $15 | Context (token) - 200000", value: "anthropic/claude-3.7-sonnet" },
      { group: "Anthropic", name: "Claude 3.5 Haiku - Input (1M) - $0.80 | Output (1M) - $4 | Context (token) - 200000", value: "anthropic/claude-3.5-haiku" },
      { group: "Anthropic", name: "Claude 3.5 Sonnet - Input (1M) - $3 | Output (1M) - $15 | Context (token) - 200000", value: "anthropic/claude-3.5-sonnet" },
      { group: "Anthropic", name: "Claude 3 Haiku - Input (1M) - $0.25 | Output (1M) - $1.25 | Context (token) - 200000", value: "anthropic/claude-3-haiku" },
      { group: "Anthropic", name: "Claude 3 Opus - Input (1M) - $15 | Output (1M) - $75 | Context (token) - 200000", value: "anthropic/claude-3-opus" },
      { group: "Anthropic", name: "Claude 3 Sonnet - Input (1M) - $3 | Output (1M) - $15 | Context (token) - 200000", value: "anthropic/claude-3-sonnet" },
      { group: "Anthropic", name: "Claude v2.1 - Input (1M) - $8 | Output (1M) - $24 | Context (token) - 200000", value: "anthropic/claude-2.1" },
      { group: "Anthropic", name: "Claude v2 - Input (1M) - $8 | Output (1M) - $24 | Context (token) - 200000", value: "anthropic/claude-2" },
      { group: "Anthropic", name: "Claude v2.0 - Input (1M) - $8 | Output (1M) - $24 | Context (token) - 100000", value: "anthropic/claude-2.0" },
      { group: "Anthropic", name: "Claude 3 Haiku (self-moderated) - Input (1M) - $0.25 | Output (1M) - $1.25 | Context (token) - 200000", value: "anthropic/claude-3-haiku:beta" },
      { group: "Anthropic", name: "Claude 3 Opus (self-moderated) - Input (1M) - $15 | Output (1M) - $75 | Context (token) - 200000", value: "anthropic/claude-3-opus:beta" },
      { group: "Anthropic", name: "Claude 3 Sonnet (self-moderated) - Input (1M) - $3 | Output (1M) - $15 | Context (token) - 200000", value: "anthropic/claude-3-sonnet:beta" },
      { group: "Anthropic", name: "Claude 3.5 Haiku (2024-10-22) - Input (1M) - $0.80 | Output (1M) - $4 | Context (token) - 200000", value: "anthropic/claude-3.5-haiku-20241022:beta" },
      { group: "Anthropic", name: "Claude 3.5 Haiku (2024-10-22) - Input (1M) - $0.80 | Output (1M) - $4 | Context (token) - 200000", value: "anthropic/claude-3.5-haiku-20241022" },
      { group: "Anthropic", name: "Claude 3.5 Haiku (self-moderated) - Input (1M) - $0.80 | Output (1M) - $4 | Context (token) - 200000", value: "anthropic/claude-3.5-haiku:beta" },
      { group: "Anthropic", name: "Claude 3.5 Sonnet (2024-06-20) - Input (1M) - $3 | Output (1M) - $15 | Context (token) - 200000", value: "anthropic/claude-3.5-sonnet-20240620:beta" },
      { group: "Anthropic", name: "Claude 3.5 Sonnet (2024-06-20) - Input (1M) - $3 | Output (1M) - $15 | Context (token) - 200000", value: "anthropic/claude-3.5-sonnet-20240620" },
      { group: "Anthropic", name: "Claude 3.5 Sonnet (self-moderated) - Input (1M) - $3 | Output (1M) - $15 | Context (token) - 200000", value: "anthropic/claude-3.5-sonnet:beta" },
      { group: "Anthropic", name: "Claude 3.7 Sonnet (self-moderated) - Input (1M) - $3 | Output (1M) - $15 | Context (token) - 200000", value: "anthropic/claude-3.7-sonnet:beta" },
      { group: "Anthropic", name: "Claude 3.7 Sonnet (thinking) - Input (1M) - $3 | Output (1M) - $15 | Context (token) - 200000", value: "anthropic/claude-3.7-sonnet:thinking" },
      { group: "Anthropic", name: "Claude v2 (self-moderated) - Input (1M) - $8 | Output (1M) - $24 | Context (token) - 200000", value: "anthropic/claude-2:beta" },
      { group: "Anthropic", name: "Claude v2.0 (self-moderated) - Input (1M) - $8 | Output (1M) - $24 | Context (token) - 100000", value: "anthropic/claude-2.0:beta" },
      { group: "Anthropic", name: "Claude v2.1 (self-moderated) - Input (1M) - $8 | Output (1M) - $24 | Context (token) - 200000", value: "anthropic/claude-2.1:beta" },
      { group: "Arcee AI", name: "Caller Large - Input (1M) - $0.55 | Output (1M) - $0.85 | Context (token) - 32768", value: "arcee-ai/caller-large" },
      { group: "Arcee AI", name: "Spotlight - Input (1M) - $0.18 | Output (1M) - $0.18 | Context (token) - 131072", value: "arcee-ai/spotlight" },
      { group: "Arcee AI", name: "Maestro Reasoning - Input (1M) - $0.90 | Output (1M) - $3.30 | Context (token) - 131072", value: "arcee-ai/maestro-reasoning" },
      { group: "Arcee AI", name: "Virtuoso Large - Input (1M) - $0.75 | Output (1M) - $1.20 | Context (token) - 131072", value: "arcee-ai/virtuoso-large" },
      { group: "Arcee AI", name: "Coder Large - Input (1M) - $0.50 | Output (1M) - $0.80 | Context (token) - 32768", value: "arcee-ai/coder-large" },
      { group: "Arcee AI", name: "Virtuoso Medium V2 - Input (1M) - $0.50 | Output (1M) - $0.80 | Context (token) - 131072", value: "arcee-ai/virtuoso-medium-v2" },
      { group: "Arcee AI", name: "Arcee Blitz - Input (1M) - $0.45 | Output (1M) - $0.75 | Context (token) - 32768", value: "arcee-ai/arcee-blitz" },
      { group: "ArliAI", name: "QwQ 32B RpR v1 (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32768", value: "arliai/qwq-32b-arliai-rpr-v1:free" },
      { group: "Bytedance", name: "UI-TARS 72B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32768", value: "bytedance-research/ui-tars-72b:free" },
      { group: "Cohere", name: "Command A - Input (1M) - $2.50 | Output (1M) - $10 | Context (token) - 256000", value: "cohere/command-a" },
      { group: "Cohere", name: "Command R+ - Input (1M) - $3 | Output (1M) - $15 | Context (token) - 128000", value: "cohere/command-r-plus" },
      { group: "Cohere", name: "Command - Input (1M) - $1 | Output (1M) - $2 | Context (token) - 4096", value: "cohere/command" },
      { group: "Cohere", name: "Command R - Input (1M) - $0.50 | Output (1M) - $1.50 | Context (token) - 128000", value: "cohere/command-r" },
      { group: "Cohere", name: "Command R7B (12-2024) - Input (1M) - $0.038 | Output (1M) - $0.15 | Context (token) - 128000", value: "cohere/command-r7b-12-2024" },
      { group: "Cohere", name: "Command R (03-2024) - Input (1M) - $0.50 | Output (1M) - $1.50 | Context (token) - 128000", value: "cohere/command-r-03-2024" },
      { group: "Cohere", name: "Command R (08-2024) - Input (1M) - $0.15 | Output (1M) - $0.60 | Context (token) - 128000", value: "cohere/command-r-08-2024" },
      { group: "Cohere", name: "Command R+ (04-2024) - Input (1M) - $3 | Output (1M) - $15 | Context (token) - 128000", value: "cohere/command-r-plus-04-2024" },
      { group: "Cohere", name: "Command R+ (08-2024) - Input (1M) - $2.50 | Output (1M) - $10 | Context (token) - 128000", value: "cohere/command-r-plus-08-2024" },
      { group: "DeepSeek", name: "DeepSeek Prover V2 - Input (1M) - $0.50 | Output (1M) - $2.18 | Context (token) - 131072", value: "deepseek/deepseek-prover-v2" },
      { group: "DeepSeek", name: "DeepSeek V3 0324 - Input (1M) - $0.30 | Output (1M) - $0.88 | Context (token) - 163840", value: "deepseek/deepseek-chat-v3-0324" },
      { group: "DeepSeek", name: "R1 Distill Llama 8B - Input (1M) - $0.04 | Output (1M) - $0.04 | Context (token) - 32000", value: "deepseek/deepseek-r1-distill-llama-8b" },
      { group: "DeepSeek", name: "R1 Distill Qwen 1.5B - Input (1M) - $0.18 | Output (1M) - $0.18 | Context (token) - 131072", value: "deepseek/deepseek-r1-distill-qwen-1.5b" },
      { group: "DeepSeek", name: "R1 Distill Qwen 32B - Input (1M) - $0.12 | Output (1M) - $0.18 | Context (token) - 131072", value: "deepseek/deepseek-r1-distill-qwen-32b" },
      { group: "DeepSeek", name: "R1 Distill Qwen 14B - Input (1M) - $0.15 | Output (1M) - $0.15 | Context (token) - 64000", value: "deepseek/deepseek-r1-distill-qwen-14b" },
      { group: "DeepSeek", name: "R1 Distill Llama 70B - Input (1M) - $0.10 | Output (1M) - $0.40 | Context (token) - 131072", value: "deepseek/deepseek-r1-distill-llama-70b" },
      { group: "DeepSeek", name: "R1 - Input (1M) - $0.50 | Output (1M) - $2.18 | Context (token) - 163840", value: "deepseek/deepseek-r1" },
      { group: "DeepSeek", name: "DeepSeek V3 - Input (1M) - $0.38 | Output (1M) - $0.89 | Context (token) - 163840", value: "deepseek/deepseek-chat" },
      { group: "DeepSeek", name: "DeepSeek Prover V2 (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 163840", value: "deepseek/deepseek-prover-v2:free" },
      { group: "DeepSeek", name: "DeepSeek R1 Zero (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 163840", value: "deepseek/deepseek-r1-zero:free" },
      { group: "DeepSeek", name: "DeepSeek V3 (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 163840", value: "deepseek/deepseek-chat:free" },
      { group: "DeepSeek", name: "DeepSeek V3 0324 (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 163840", value: "deepseek/deepseek-chat-v3-0324:free" },
      { group: "DeepSeek", name: "DeepSeek V3 Base (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 163840", value: "deepseek/deepseek-v3-base:free" },
      { group: "DeepSeek", name: "R1 (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 163840", value: "deepseek/deepseek-r1:free" },
      { group: "DeepSeek", name: "R1 Distill Llama 70B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 8192", value: "deepseek/deepseek-r1-distill-llama-70b:free" },
      { group: "DeepSeek", name: "R1 Distill Qwen 14B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 64000", value: "deepseek/deepseek-r1-distill-qwen-14b:free" },
      { group: "DeepSeek", name: "R1 Distill Qwen 32B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 16000", value: "deepseek/deepseek-r1-distill-qwen-32b:free" },
      { group: "Dolphin", name: "Dolphin3.0 Mistral 24B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32768", value: "cognitivecomputations/dolphin3.0-mistral-24b:free" },
      { group: "Dolphin", name: "Dolphin3.0 R1 Mistral 24B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32768", value: "cognitivecomputations/dolphin3.0-r1-mistral-24b:free" },
      { group: "EleutherAI", name: "Llemma 7b - Input (1M) - $0.80 | Output (1M) - $1.20 | Context (token) - 4096", value: "eleutherai/llemma_7b" },
      { group: "Google", name: "Gemini 2.5 Pro Preview - Input (1M) - $1.25 | Output (1M) - $10 | Context (token) - 1048576", value: "google/gemini-2.5-pro-preview" },
      { group: "Google", name: "Gemini 2.5 Flash Preview - Input (1M) - $0.15 | Output (1M) - $0.60 | Context (token) - 1048576", value: "google/gemini-2.5-flash-preview" },
      { group: "Google", name: "Gemini 2.5 Pro Experimental - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 1048576", value: "google/gemini-2.5-pro-exp-03-25" },
      { group: "Google", name: "Gemma 3 4B - Input (1M) - $0.02 | Output (1M) - $0.04 | Context (token) - 131072", value: "google/gemma-3-4b-it" },
      { group: "Google", name: "Gemma 3 12B - Input (1M) - $0.05 | Output (1M) - $0.10 | Context (token) - 131072", value: "google/gemma-3-12b-it" },
      { group: "Google", name: "Gemma 3 27B - Input (1M) - $0.10 | Output (1M) - $0.20 | Context (token) - 131072", value: "google/gemma-3-27b-it" },
      { group: "Google", name: "Gemini 2.0 Flash Lite - Input (1M) - $0.075 | Output (1M) - $0.30 | Context (token) - 1048576", value: "google/gemini-2.0-flash-lite-001" },
      { group: "Google", name: "Gemini 2.0 Flash - Input (1M) - $0.10 | Output (1M) - $0.40 | Context (token) - 1048576", value: "google/gemini-2.0-flash-001" },
      { group: "Google", name: "Gemini 1.5 Flash 8B - Input (1M) - $0.038 | Output (1M) - $0.15 | Context (token) - 1000000", value: "google/gemini-flash-1.5-8b" },
      { group: "Google", name: "Gemma 2 27B - Input (1M) - $0.10 | Output (1M) - $0.30 | Context (token) - 8192", value: "google/gemma-2-27b-it" },
      { group: "Google", name: "Gemma 2 9B - Input (1M) - $0.02 | Output (1M) - $0.06 | Context (token) - 8192", value: "google/gemma-2-9b-it" },
      { group: "Google", name: "Gemini 1.5 Flash - Input (1M) - $0.075 | Output (1M) - $0.30 | Context (token) - 1000000", value: "google/gemini-flash-1.5" },
      { group: "Google", name: "Gemini 1.5 Pro - Input (1M) - $1.25 | Output (1M) - $5 | Context (token) - 2000000", value: "google/gemini-pro-1.5" },
      { group: "Google", name: "Gemini 2.0 Flash Experimental (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 1048576", value: "google/gemini-2.0-flash-exp:free" },
      { group: "Google", name: "Gemini 2.5 Flash Preview (thinking) - Input (1M) - $0.15 | Output (1M) - $3.50 | Context (token) - 1048576", value: "google/gemini-2.5-flash-preview:thinking" },
      { group: "Google", name: "Gemma 2 9B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 8192", value: "google/gemma-2-9b-it:free" },
      { group: "Google", name: "Gemma 3 1B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32768", value: "google/gemma-3-1b-it:free" },
      { group: "Google", name: "Gemma 3 4B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 131072", value: "google/gemma-3-4b-it:free" },
      { group: "Google", name: "Gemma 3 12B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 131072", value: "google/gemma-3-12b-it:free" },
      { group: "Google", name: "Gemma 3 27B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 96000", value: "google/gemma-3-27b-it:free" },
      { group: "Inception", name: "Mercury Coder Small Beta - Input (1M) - $0.25 | Output (1M) - $1 | Context (token) - 32000", value: "inception/mercury-coder-small-beta" },
      { group: "Infermatic", name: "Mistral Nemo Inferor 12B - Input (1M) - $0.80 | Output (1M) - $1.20 | Context (token) - 16384", value: "infermatic/mn-inferor-12b" },
      { group: "Inflection", name: "Inflection 3 Productivity - Input (1M) - $2.50 | Output (1M) - $10 | Context (token) - 8000", value: "inflection/inflection-3-productivity" },
      { group: "Inflection", name: "Inflection 3 Pi - Input (1M) - $2.50 | Output (1M) - $10 | Context (token) - 8000", value: "inflection/inflection-3-pi" },
      { group: "Liquid", name: "LFM 7B - Input (1M) - $0.01 | Output (1M) - $0.01 | Context (token) - 32768", value: "liquid/lfm-7b" },
      { group: "Liquid", name: "LFM 3B - Input (1M) - $0.02 | Output (1M) - $0.02 | Context (token) - 32768", value: "liquid/lfm-3b" },
      { group: "Liquid", name: "LFM 40B MoE - Input (1M) - $0.15 | Output (1M) - $0.15 | Context (token) - 32768", value: "liquid/lfm-40b" },
      { group: "Mancer", name: "Weaver (alpha) - Input (1M) - $1.12525% off | Output (1M) - $1.12525% off | Context (token) - 8000", value: "mancer/weaver" },
      { group: "Meta", name: "Llama Guard 4 12B - Input (1M) - $0.05 | Output (1M) - $0.05 | Context (token) - 163840", value: "meta-llama/llama-guard-4-12b" },
      { group: "Meta", name: "Llama 4 Maverick - Input (1M) - $0.16 | Output (1M) - $0.60 | Context (token) - 1048576", value: "meta-llama/llama-4-maverick" },
      { group: "Meta", name: "Llama 4 Scout - Input (1M) - $0.08 | Output (1M) - $0.30 | Context (token) - 1048576", value: "meta-llama/llama-4-scout" },
      { group: "Meta", name: "Llama 3.3 70B Instruct - Input (1M) - $0.07 | Output (1M) - $0.33 | Context (token) - 131000", value: "meta-llama/llama-3.3-70b-instruct" },
      { group: "Meta", name: "Llama 3.2 3B Instruct - Input (1M) - $0.01 | Output (1M) - $0.02 | Context (token) - 131072", value: "meta-llama/llama-3.2-3b-instruct" },
      { group: "Meta", name: "Llama 3.2 1B Instruct - Input (1M) - $0.005 | Output (1M) - $0.01 | Context (token) - 131072", value: "meta-llama/llama-3.2-1b-instruct" },
      { group: "Meta", name: "Llama 3.2 90B Vision Instruct - Input (1M) - $1.20 | Output (1M) - $1.20 | Context (token) - 131072", value: "meta-llama/llama-3.2-90b-vision-instruct" },
      { group: "Meta", name: "Llama 3.2 11B Vision Instruct - Input (1M) - $0.049 | Output (1M) - $0.049 | Context (token) - 131072", value: "meta-llama/llama-3.2-11b-vision-instruct" },
      { group: "Meta", name: "Llama 3.1 8B Instruct - Input (1M) - $0.02 | Output (1M) - $0.03 | Context (token) - 16384", value: "meta-llama/llama-3.1-8b-instruct" },
      { group: "Meta", name: "Llama 3.1 405B Instruct - Input (1M) - $0.80 | Output (1M) - $0.80 | Context (token) - 32768", value: "meta-llama/llama-3.1-405b-instruct" },
      { group: "Meta", name: "Llama 3.1 70B Instruct - Input (1M) - $0.10 | Output (1M) - $0.28 | Context (token) - 131072", value: "meta-llama/llama-3.1-70b-instruct" },
      { group: "Meta", name: "LlamaGuard 2 8B - Input (1M) - $0.20 | Output (1M) - $0.20 | Context (token) - 8192", value: "meta-llama/llama-guard-2-8b" },
      { group: "Meta", name: "Llama 3 8B Instruct - Input (1M) - $0.03 | Output (1M) - $0.06 | Context (token) - 8192", value: "meta-llama/llama-3-8b-instruct" },
      { group: "Meta", name: "Llama 3 70B Instruct - Input (1M) - $0.30 | Output (1M) - $0.40 | Context (token) - 8192", value: "meta-llama/llama-3-70b-instruct" },
      { group: "Meta", name: "Llama 2 70B Chat - Input (1M) - $0.90 | Output (1M) - $0.90 | Context (token) - 4096", value: "meta-llama/llama-2-70b-chat" },
      { group: "Meta", name: "Llama 3.1 8B Instruct (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 131072", value: "meta-llama/llama-3.1-8b-instruct:free" },
      { group: "Meta", name: "Llama 3.1 405B (base) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 64000", value: "meta-llama/llama-3.1-405b:free" },
      { group: "Meta", name: "Llama 3.1 405B (base) - Input (1M) - $2 | Output (1M) - $2 | Context (token) - 32768", value: "meta-llama/llama-3.1-405b" },
      { group: "Meta", name: "Llama 3.2 1B Instruct (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 131000", value: "meta-llama/llama-3.2-1b-instruct:free" },
      { group: "Meta", name: "Llama 3.2 3B Instruct (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 20000", value: "meta-llama/llama-3.2-3b-instruct:free" },
      { group: "Meta", name: "Llama 3.2 11B Vision Instruct (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 131072", value: "meta-llama/llama-3.2-11b-vision-instruct:free" },
      { group: "Meta", name: "Llama 3.3 8B Instruct (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 12800", value: "meta-llama/llama-3.3-8b-instruct:free" },
      { group: "Meta", name: "Llama 3.3 70B Instruct (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 131072", value: "meta-llama/llama-3.3-70b-instruct:free" },
      { group: "Meta", name: "Llama 4 Maverick (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 128000", value: "meta-llama/llama-4-maverick:free" },
      { group: "Meta", name: "Llama 4 Scout (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 256000", value: "meta-llama/llama-4-scout:free" },
      { group: "Microsoft", name: "Phi 4 Reasoning Plus - Input (1M) - $0.07 | Output (1M) - $0.35 | Context (token) - 32768", value: "microsoft/phi-4-reasoning-plus" },
      { group: "Microsoft", name: "Phi 4 Multimodal Instruct - Input (1M) - $0.05 | Output (1M) - $0.10 | Context (token) - 131072", value: "microsoft/phi-4-multimodal-instruct" },
      { group: "Microsoft", name: "Phi 4 - Input (1M) - $0.07 | Output (1M) - $0.14 | Context (token) - 16384", value: "microsoft/phi-4" },
      { group: "Microsoft", name: "Phi-3.5 Mini 128K Instruct - Input (1M) - $0.03 | Output (1M) - $0.09 | Context (token) - 131072", value: "microsoft/phi-3.5-mini-128k-instruct" },
      { group: "Microsoft", name: "Phi-3 Mini 128K Instruct - Input (1M) - $0.10 | Output (1M) - $0.10 | Context (token) - 128000", value: "microsoft/phi-3-mini-128k-instruct" },
      { group: "Microsoft", name: "Phi-3 Medium 128K Instruct - Input (1M) - $0.10 | Output (1M) - $0.30 | Context (token) - 131072", value: "microsoft/phi-3-medium-128k-instruct" },
      { group: "Microsoft", name: "MAI DS R1 (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 163840", value: "microsoft/mai-ds-r1:free" },
      { group: "Microsoft", name: "Phi 4 Reasoning (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32768", value: "microsoft/phi-4-reasoning:free" },
      { group: "Microsoft", name: "Phi 4 Reasoning Plus (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32768", value: "microsoft/phi-4-reasoning-plus:free" },
      { group: "MiniMax", name: "MiniMax-01 - Input (1M) - $0.20 | Output (1M) - $1.10 | Context (token) - 1000192", value: "minimax/minimax-01" },
      { group: "Mistral", name: "Mistral Medium 3 - Input (1M) - $0.40 | Output (1M) - $2 | Context (token) - 131072", value: "mistralai/mistral-medium-3" },
      { group: "Mistral", name: "Ministral 8B - Input (1M) - $0.10 | Output (1M) - $0.10 | Context (token) - 131072", value: "mistral/ministral-8b" },
      { group: "Mistral", name: "Mistral Small 3.1 24B - Input (1M) - $0.05 | Output (1M) - $0.15 | Context (token) - 131072", value: "mistralai/mistral-small-3.1-24b-instruct" },
      { group: "Mistral", name: "Saba - Input (1M) - $0.20 | Output (1M) - $0.60 | Context (token) - 32768", value: "mistralai/mistral-saba" },
      { group: "Mistral", name: "Mistral Small 3 - Input (1M) - $0.06 | Output (1M) - $0.12 | Context (token) - 28000", value: "mistralai/mistral-small-24b-instruct-2501" },
      { group: "Mistral", name: "Codestral 2501 - Input (1M) - $0.30 | Output (1M) - $0.90 | Context (token) - 262144", value: "mistralai/codestral-2501" },
      { group: "Mistral", name: "Pixtral Large 2411 - Input (1M) - $2 | Output (1M) - $6 | Context (token) - 131072", value: "mistralai/pixtral-large-2411" },
      { group: "Mistral", name: "Ministral 8B - Input (1M) - $0.10 | Output (1M) - $0.10 | Context (token) - 128000", value: "mistralai/ministral-8b" },
      { group: "Mistral", name: "Ministral 3B - Input (1M) - $0.04 | Output (1M) - $0.04 | Context (token) - 131072", value: "mistralai/ministral-3b" },
      { group: "Mistral", name: "Pixtral 12B - Input (1M) - $0.10 | Output (1M) - $0.10 | Context (token) - 32768", value: "mistralai/pixtral-12b" },
      { group: "Mistral", name: "Codestral Mamba - Input (1M) - $0.25 | Output (1M) - $0.25 | Context (token) - 262144", value: "mistralai/codestral-mamba" },
      { group: "Mistral", name: "Mistral Nemo - Input (1M) - $0.025 | Output (1M) - $0.07 | Context (token) - 131072", value: "mistralai/mistral-nemo" },
      { group: "Mistral", name: "Mistral 7B Instruct - Input (1M) - $0.028 | Output (1M) - $0.054 | Context (token) - 32768", value: "mistralai/mistral-7b-instruct" },
      { group: "Mistral", name: "Mistral 7B Instruct v0.3 - Input (1M) - $0.028 | Output (1M) - $0.054 | Context (token) - 32768", value: "mistralai/mistral-7b-instruct-v0.3" },
      { group: "Mistral", name: "Mixtral 8x22B Instruct - Input (1M) - $0.40 | Output (1M) - $1.20 | Context (token) - 65536", value: "mistralai/mixtral-8x22b-instruct" },
      { group: "Mistral", name: "Mistral 7B Instruct v0.2 - Input (1M) - $0.20 | Output (1M) - $0.20 | Context (token) - 32768", value: "mistralai/mistral-7b-instruct-v0.2" },
      { group: "Mistral", name: "Mixtral 8x7B Instruct - Input (1M) - $0.08 | Output (1M) - $0.24 | Context (token) - 32768", value: "mistralai/mixtral-8x7b-instruct" },
      { group: "Mistral", name: "Mistral 7B Instruct v0.1 - Input (1M) - $0.11 | Output (1M) - $0.19 | Context (token) - 2824", value: "mistralai/mistral-7b-instruct-v0.1" },
      { group: "Mistral", name: "Mistral 7B Instruct (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32768", value: "mistralai/mistral-7b-instruct:free" },
      { group: "Mistral", name: "Mistral Nemo (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 128000", value: "mistralai/mistral-nemo:free" },
      { group: "Mistral", name: "Mistral Small 3 (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32768", value: "mistralai/mistral-small-24b-instruct-2501:free" },
      { group: "Mistral", name: "Mistral Small 3.1 24B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 96000", value: "mistralai/mistral-small-3.1-24b-instruct:free" },
      { group: "Moonshot AI", name: "Kimi VL A3B Thinking (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 131072", value: "moonshotai/kimi-vl-a3b-thinking:free" },
      { group: "Moonshot AI", name: "Moonlight 16B A3B Instruct (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 8192", value: "moonshotai/moonlight-16b-a3b-instruct:free" },
      { group: "NeverSleep", name: "Llama 3 Lumimaid 70B - Input (1M) - $4 | Output (1M) - $6 | Context (token) - 8192", value: "neversleep/llama-3-lumimaid-70b" },
      { group: "Nous", name: "Hermes 3 70B Instruct - Input (1M) - $0.12 | Output (1M) - $0.30 | Context (token) - 131072", value: "nousresearch/hermes-3-llama-3.1-70b" },
      { group: "Nous", name: "Hermes 3 405B Instruct - Input (1M) - $0.80 | Output (1M) - $0.80 | Context (token) - 131072", value: "nousresearch/hermes-3-llama-3.1-405b" },
      { group: "Nous", name: "Hermes 2 Mixtral 8x7B DPO - Input (1M) - $0.60 | Output (1M) - $0.60 | Context (token) - 32768", value: "nousresearch/nous-hermes-2-mixtral-8x7b-dpo" },
      { group: "Nous", name: "DeepHermes 3 Llama 3 8B Preview (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 131072", value: "nousresearch/deephermes-3-llama-3-8b-preview:free" },
      { group: "Nous", name: "DeepHermes 3 Mistral 24B Preview (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32768", value: "nousresearch/deephermes-3-mistral-24b-preview:free" },
      { group: "NousResearch", name: "Hermes 2 Pro - Llama-3 8B - Input (1M) - $0.025 | Output (1M) - $0.04 | Context (token) - 131072", value: "nousresearch/hermes-2-pro-llama-3-8b" },
      { group: "NVIDIA", name: "Llama 3.3 Nemotron Super 49B v1 - Input (1M) - $0.13 | Output (1M) - $0.40 | Context (token) - 131072", value: "nvidia/llama-3.3-nemotron-super-49b-v1" },
      { group: "NVIDIA", name: "Llama 3.1 Nemotron 70B Instruct - Input (1M) - $0.12 | Output (1M) - $0.30 | Context (token) - 131072", value: "nvidia/llama-3.1-nemotron-70b-instruct" },
      { group: "NVIDIA", name: "Llama 3.1 Nemotron Ultra 253B v1 (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 131072", value: "nvidia/llama-3.1-nemotron-ultra-253b-v1:free" },
      { group: "NVIDIA", name: "Llama 3.3 Nemotron Super 49B v1 (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 131072", value: "nvidia/llama-3.3-nemotron-super-49b-v1:free" },
      { group: "OlympicCoder", name: "OlympicCoder 32B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32768", value: "open-r1/olympiccoder-32b:free" },
      { group: "OpenAI", name: "o4 Mini High - Input (1M) - $1.10 | Output (1M) - $4.40 | Context (token) - 200000", value: "openai/o4-mini-high" },
      { group: "OpenAI", name: "o3 - Input (1M) - $10 | Output (1M) - $40 | Context (token) - 200000", value: "openai/o3" },
      { group: "OpenAI", name: "o4 Mini - Input (1M) - $1.10 | Output (1M) - $4.40 | Context (token) - 200000", value: "openai/o4-mini" },
      { group: "OpenAI", name: "GPT-4.1 - Input (1M) - $2 | Output (1M) - $8 | Context (token) - 1047576", value: "openai/gpt-4.1" },
      { group: "OpenAI", name: "GPT-4.1 Mini - Input (1M) - $0.40 | Output (1M) - $1.60 | Context (token) - 1047576", value: "openai/gpt-4.1-mini" },
      { group: "OpenAI", name: "GPT-4.1 Nano - Input (1M) - $0.10 | Output (1M) - $0.40 | Context (token) - 1047576", value: "openai/gpt-4.1-nano" },
      { group: "OpenAI", name: "o1-pro - Input (1M) - $150 | Output (1M) - $600 | Context (token) - 200000", value: "openai/o1-pro" },
      { group: "OpenAI", name: "GPT-4o-mini Search Preview - Input (1M) - $0.15 | Output (1M) - $0.60 | Context (token) - 128000", value: "openai/gpt-4o-mini-search-preview" },
      { group: "OpenAI", name: "GPT-4o Search Preview - Input (1M) - $2.50 | Output (1M) - $10 | Context (token) - 128000", value: "openai/gpt-4o-search-preview" },
      { group: "OpenAI", name: "o3 Mini High - Input (1M) - $1.10 | Output (1M) - $4.40 | Context (token) - 200000", value: "openai/o3-mini-high" },
      { group: "OpenAI", name: "o3 Mini - Input (1M) - $1.10 | Output (1M) - $4.40 | Context (token) - 200000", value: "openai/o3-mini" },
      { group: "OpenAI", name: "o1 - Input (1M) - $15 | Output (1M) - $60 | Context (token) - 200000", value: "openai/o1" },
      { group: "OpenAI", name: "o1-preview - Input (1M) - $15 | Output (1M) - $60 | Context (token) - 128000", value: "openai/o1-preview" },
      { group: "OpenAI", name: "o1-mini - Input (1M) - $1.10 | Output (1M) - $4.40 | Context (token) - 128000", value: "openai/o1-mini" },
      { group: "OpenAI", name: "ChatGPT-4o - Input (1M) - $5 | Output (1M) - $15 | Context (token) - 128000", value: "openai/chatgpt-4o-latest" },
      { group: "OpenAI", name: "GPT-4o-mini - Input (1M) - $0.15 | Output (1M) - $0.60 | Context (token) - 128000", value: "openai/gpt-4o-mini" },
      { group: "OpenAI", name: "GPT-4o - Input (1M) - $2.50 | Output (1M) - $10 | Context (token) - 128000", value: "openai/gpt-4o" },
      { group: "OpenAI", name: "GPT-4 Turbo - Input (1M) - $10 | Output (1M) - $30 | Context (token) - 128000", value: "openai/gpt-4-turbo" },
      { group: "OpenAI", name: "GPT-4 Turbo Preview - Input (1M) - $10 | Output (1M) - $30 | Context (token) - 128000", value: "openai/gpt-4-turbo-preview" },
      { group: "OpenAI", name: "GPT-3.5 Turbo Instruct - Input (1M) - $1.50 | Output (1M) - $2 | Context (token) - 4095", value: "openai/gpt-3.5-turbo-instruct" },
      { group: "OpenAI", name: "GPT-3.5 Turbo 16k - Input (1M) - $3 | Output (1M) - $4 | Context (token) - 16385", value: "openai/gpt-3.5-turbo-16k" },
      { group: "OpenAI", name: "GPT-4 32k - Input (1M) - $60 | Output (1M) - $120 | Context (token) - 32767", value: "openai/gpt-4-32k" },
      { group: "OpenAI", name: "GPT-3.5 Turbo - Input (1M) - $0.50 | Output (1M) - $1.50 | Context (token) - 16385", value: "openai/gpt-3.5-turbo" },
      { group: "OpenAI", name: "GPT-3.5 Turbo 16k - Input (1M) - $0.50 | Output (1M) - $1.50 | Context (token) - 16385", value: "openai/gpt-3.5-turbo-0125" },
      { group: "OpenAI", name: "GPT-4 - Input (1M) - $30 | Output (1M) - $60 | Context (token) - 8191", value: "openai/gpt-4" },
      { group: "OpenAI", name: "GPT-3.5 Turbo 16k (older v1106) - Input (1M) - $1 | Output (1M) - $2 | Context (token) - 16385", value: "openai/gpt-3.5-turbo-1106" },
      { group: "OpenAI", name: "GPT-3.5 Turbo (older v0613) - Input (1M) - $1 | Output (1M) - $2 | Context (token) - 4095", value: "openai/gpt-3.5-turbo-0613" },
      { group: "OpenAI", name: "GPT-4 32k (older v0314) - Input (1M) - $60 | Output (1M) - $120 | Context (token) - 32767", value: "openai/gpt-4-32k-0314" },
      { group: "OpenAI", name: "GPT-4 (older v0314) - Input (1M) - $30 | Output (1M) - $60 | Context (token) - 8191", value: "openai/gpt-4-0314" },
      { group: "OpenAI", name: "GPT-4 Turbo (older v1106) - Input (1M) - $10 | Output (1M) - $30 | Context (token) - 128000", value: "openai/gpt-4-1106-preview" },
      { group: "OpenAI", name: "GPT-4o (2024-05-13) - Input (1M) - $5 | Output (1M) - $15 | Context (token) - 128000", value: "openai/gpt-4o-2024-05-13" },
      { group: "OpenAI", name: "GPT-4o (2024-08-06) - Input (1M) - $2.50 | Output (1M) - $10 | Context (token) - 128000", value: "openai/gpt-4o-2024-08-06" },
      { group: "OpenAI", name: "GPT-4o (2024-11-20) - Input (1M) - $2.50 | Output (1M) - $10 | Context (token) - 128000", value: "openai/gpt-4o-2024-11-20" },
      { group: "OpenAI", name: "GPT-4o (extended) - Input (1M) - $6 | Output (1M) - $18 | Context (token) - 128000", value: "openai/gpt-4o:extended" },
      { group: "OpenAI", name: "GPT-4o-mini (2024-07-18) - Input (1M) - $0.15 | Output (1M) - $0.60 | Context (token) - 128000", value: "openai/gpt-4o-mini-2024-07-18" },
      { group: "OpenAI", name: "GPT-4.5 (Preview) - Input (1M) - $75 | Output (1M) - $150 | Context (token) - 128000", value: "openai/gpt-4.5-preview" },
      { group: "OpenAI", name: "o1-mini (2024-09-12) - Input (1M) - $1.10 | Output (1M) - $4.40 | Context (token) - 128000", value: "openai/o1-mini-2024-09-12" },
      { group: "OpenAI", name: "o1-preview (2024-09-12) - Input (1M) - $15 | Output (1M) - $60 | Context (token) - 128000", value: "openai/o1-preview-2024-09-12" },
      { group: "OpenGVLab", name: "InternVL3 2B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32000", value: "opengvlab/internvl3-2b:free" },
      { group: "OpenGVLab", name: "InternVL3 14B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32000", value: "opengvlab/internvl3-14b:free" },
      { group: "Perplexity", name: "Sonar Reasoning Pro - Input (1M) - $2 | Output (1M) - $8 | Context (token) - 128000", value: "perplexity/sonar-reasoning-pro" },
      { group: "Perplexity", name: "Sonar Pro - Input (1M) - $3 | Output (1M) - $15 | Context (token) - 200000", value: "perplexity/sonar-pro" },
      { group: "Perplexity", name: "Sonar Deep Research - Input (1M) - $2 | Output (1M) - $8 | Context (token) - 128000", value: "perplexity/sonar-deep-research" },
      { group: "Perplexity", name: "R1 1776 - Input (1M) - $2 | Output (1M) - $8 | Context (token) - 128000", value: "perplexity/r1-1776" },
      { group: "Perplexity", name: "Sonar Reasoning - Input (1M) - $1 | Output (1M) - $5 | Context (token) - 127000", value: "perplexity/sonar-reasoning" },
      { group: "Perplexity", name: "Sonar - Input (1M) - $1 | Output (1M) - $1 | Context (token) - 127072", value: "perplexity/sonar" },
      { group: "Perplexity", name: "Llama 3.1 Sonar 8B Online - Input (1M) - $0.20 | Output (1M) - $0.20 | Context (token) - 127072", value: "perplexity/llama-3.1-sonar-small-128k-online" },
      { group: "Perplexity", name: "Llama 3.1 Sonar 70B Online - Input (1M) - $1 | Output (1M) - $1 | Context (token) - 127072", value: "perplexity/llama-3.1-sonar-large-128k-online" },
      { group: "Qwen", name: "Qwen3 30B A3B - Input (1M) - $0.10 | Output (1M) - $0.30 | Context (token) - 40960", value: "qwen/qwen3-30b-a3b" },
      { group: "Qwen", name: "Qwen3 8B - Input (1M) - $0.035 | Output (1M) - $0.138 | Context (token) - 128000", value: "qwen/qwen3-8b" },
      { group: "Qwen", name: "Qwen3 14B - Input (1M) - $0.07 | Output (1M) - $0.24 | Context (token) - 40960", value: "qwen/qwen3-14b" },
      { group: "Qwen", name: "Qwen3 32B - Input (1M) - $0.10 | Output (1M) - $0.30 | Context (token) - 40960", value: "qwen/qwen3-32b" },
      { group: "Qwen", name: "Qwen3 235B A22B - Input (1M) - $0.14 | Output (1M) - $0.60 | Context (token) - 40960", value: "qwen/qwen3-235b-a22b" },
      { group: "Qwen", name: "Qwen2.5 Coder 7B Instruct - Input (1M) - $0.01 | Output (1M) - $0.03 | Context (token) - 32768", value: "qwen/qwen2.5-coder-7b-instruct" },
      { group: "Qwen", name: "Qwen2.5 VL 32B Instruct - Input (1M) - $0.90 | Output (1M) - $0.90 | Context (token) - 128000", value: "qwen/qwen2.5-vl-32b-instruct" },
      { group: "Qwen", name: "QwQ 32B - Input (1M) - $0.15 | Output (1M) - $0.20 | Context (token) - 131072", value: "qwen/qwq-32b" },
      { group: "Qwen", name: "Qwen VL Plus - Input (1M) - $0.21 | Output (1M) - $0.63 | Context (token) - 7500", value: "qwen/qwen-vl-plus" },
      { group: "Qwen", name: "Qwen VL Max - Input (1M) - $0.80 | Output (1M) - $3.20 | Context (token) - 7500", value: "qwen/qwen-vl-max" },
      { group: "Qwen", name: "Qwen-Turbo - Input (1M) - $0.05 | Output (1M) - $0.20 | Context (token) - 1000000", value: "qwen/qwen-turbo" },
      { group: "Qwen", name: "Qwen2.5 VL 72B Instruct - Input (1M) - $0.25 | Output (1M) - $0.75 | Context (token) - 32000", value: "qwen/qwen2.5-vl-72b-instruct" },
      { group: "Qwen", name: "Qwen-Plus - Input (1M) - $0.40 | Output (1M) - $1.20 | Context (token) - 131072", value: "qwen/qwen-plus" },
      { group: "Qwen", name: "Qwen-Max - Input (1M) - $1.60 | Output (1M) - $6.40 | Context (token) - 32768", value: "qwen/qwen-max" },
      { group: "Qwen", name: "QwQ 32B Preview - Input (1M) - $0.09 | Output (1M) - $0.27 | Context (token) - 32768", value: "qwen/qwq-32b-preview" },
      { group: "Qwen", name: "Qwen2.5-VL 7B Instruct - Input (1M) - $0.20 | Output (1M) - $0.20 | Context (token) - 32768", value: "qwen/qwen-2.5-vl-7b-instruct" },
      { group: "Qwen", name: "Qwen2.5 7B Instruct (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32768", value: "qwen/qwen-2.5-7b-instruct:free" },
      { group: "Qwen", name: "Qwen2.5 72B Instruct (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32768", value: "qwen/qwen-2.5-72b-instruct:free" },
      { group: "Qwen", name: "Qwen2.5 Coder 32B Instruct (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32768", value: "qwen/qwen-2.5-coder-32b-instruct:free" },
      { group: "Qwen", name: "Qwen2.5 VL 3B Instruct (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 64000", value: "qwen/qwen2.5-vl-3b-instruct:free" },
      { group: "Qwen", name: "Qwen2.5 VL 32B Instruct (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 8192", value: "qwen/qwen2.5-vl-32b-instruct:free" },
      { group: "Qwen", name: "Qwen2.5 VL 72B Instruct (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 131072", value: "qwen/qwen2.5-vl-72b-instruct:free" },
      { group: "Qwen", name: "Qwen2.5-VL 7B Instruct (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 64000", value: "qwen/qwen-2.5-vl-7b-instruct:free" },
      { group: "Qwen", name: "Qwen3 0.6B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32000", value: "qwen/qwen3-0.6b-04-28:free" },
      { group: "Qwen", name: "Qwen3 1.7B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32000", value: "qwen/qwen3-1.7b:free" },
      { group: "Qwen", name: "Qwen3 4B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 128000", value: "qwen/qwen3-4b:free" },
      { group: "Qwen", name: "Qwen3 8B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 40960", value: "qwen/qwen3-8b:free" },
      { group: "Qwen", name: "Qwen3 14B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 40960", value: "qwen/qwen3-14b:free" },
      { group: "Qwen", name: "Qwen3 30B A3B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 40960", value: "qwen/qwen3-30b-a3b:free" },
      { group: "Qwen", name: "Qwen3 32B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 40960", value: "qwen/qwen3-32b:free" },
      { group: "Qwen", name: "Qwen3 235B A22B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 40960", value: "qwen/qwen3-235b-a22b:free" },
      { group: "Qwen", name: "QwQ 32B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 40000", value: "qwen/qwq-32b:free" },
      { group: "Qwerky", name: "Qwerky 72B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32768", value: "featherless/qwerky-72b:free" },
      { group: "Reka", name: "Flash 3 (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32768", value: "rekaai/reka-flash-3:free" },
      { group: "Sao10K", name: "Llama 3.3 Euryale 70B - Input (1M) - $0.70 | Output (1M) - $0.80 | Context (token) - 131072", value: "sao10k/l3.3-euryale-70b" },
      { group: "Sao10K", name: "Llama 3.1 Euryale 70B v2.2 - Input (1M) - $0.70 | Output (1M) - $0.80 | Context (token) - 131072", value: "sao10k/l3.1-euryale-70b" },
      { group: "Sao10K", name: "Llama 3 8B Lunaris - Input (1M) - $0.02 | Output (1M) - $0.05 | Context (token) - 8192", value: "sao10k/l3-lunaris-8b" },
      { group: "Sao10k", name: "Llama 3 Euryale 70B v2.1 - Input (1M) - $1.48 | Output (1M) - $1.48 | Context (token) - 8192", value: "sao10k/l3-euryale-70b" },
      { group: "Shisa AI", name: "Shisa V2 Llama 3.3 70B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32768", value: "shisa-ai/shisa-v2-llama3.3-70b:free" },
      { group: "TheDrummer", name: "Anubis Pro 105B V1 - Input (1M) - $0.80 | Output (1M) - $1 | Context (token) - 131072", value: "thedrummer/anubis-pro-105b-v1" },
      { group: "TheDrummer", name: "Skyfall 36B V2 - Input (1M) - $0.50 | Output (1M) - $0.80 | Context (token) - 32768", value: "thedrummer/skyfall-36b-v2" },
      { group: "THUDM", name: "GLM Z1 32B - Input (1M) - $0.24 | Output (1M) - $0.24 | Context (token) - 32000", value: "thudm/glm-z1-32b" },
      { group: "THUDM", name: "GLM 4 32B - Input (1M) - $0.24 | Output (1M) - $0.24 | Context (token) - 32000", value: "thudm/glm-4-32b" },
      { group: "THUDM", name: "GLM 4 9B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32000", value: "thudm/glm-4-9b:free" },
      { group: "THUDM", name: "GLM 4 32B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32768", value: "thudm/glm-4-32b:free" },
      { group: "THUDM", name: "GLM Z1 9B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32000", value: "thudm/glm-z1-9b:free" },
      { group: "THUDM", name: "GLM Z1 32B (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 32768", value: "thudm/glm-z1-32b:free" },
      { group: "TNG", name: "DeepSeek R1T Chimera (free) - Input (1M) - $0 | Output (1M) - $0 | Context (token) - 163840", value: "tngtech/deepseek-r1t-chimera:free" },
      { group: "xAI", name: "Grok 3 Mini - Input (1M) - $0.30 | Output (1M) - $0.50 | Context (token) - 131072", value: "Betax-ai/grok-3-mini-beta" },
      { group: "xAI", name: "Grok 3 - Input (1M) - $3 | Output (1M) - $15 | Context (token) - 131072", value: "Betax-ai/grok-3-beta" },
      { group: "xAI", name: "Grok 2 Vision - Input (1M) - $2 | Output (1M) - $10 | Context (token) - 32768", value: "1212x-ai/grok-2-vision-1212" },
      { group: "xAI", name: "Grok 2 - Input (1M) - $2 | Output (1M) - $10 | Context (token) - 131072", value: "1212x-ai/grok-2-1212" },
      { group: "xAI", name: "Grok Vision - Input (1M) - $5 | Output (1M) - $15 | Context (token) - 8192", value: "Betax-ai/grok-vision-beta" },
      { group: "xAI", name: "Grok - Input (1M) - $5 | Output (1M) - $15 | Context (token) - 131072", value: "Betax-ai/grok-beta" },
    ];

    if ($('body#cat_addbiblio.cat').length > 0) {

        // globals to track our expense
        let inputTokens = 0;
		let outputTokens = 0;
		
        var titleAField = $('[id^="tag_245_subfield_a"]');
        var titleBField = $('[id^="tag_245_subfield_b"]');
        var titleCField = $('[id^="tag_245_subfield_c"]');
        var isbnField = $('[id^="tag_020_subfield_a"]');
        var ddc082aField = $('[id^="tag_082_subfield_a_"]');
        var summaryField = $('[id^="tag_520_subfield_a"]');

        var openrouterApiKey = 'ADD_YOUR_OWN_OPENROUTER_API_KEY';

        var triggerCheckboxHTML = '<div class="ddc-controls">' +
            '<span class="field_controls ddc-trigger-container" id="ai-ddc-trigger">' +
            '<label><input type="checkbox" id="get-ddc-suggestions"> Get Dewey Suggestions</label>' +
            '<span id="ddc-spinner" style="display: none; margin-left: 5px;"><i class="fa fa-spinner fa-spin"></i></span>' +
            '</span>';

        var select2HTML = '<select id="modelSelect2">';
        select2HTML += '<option value=""> -- Select a LLM model from this list -- </option>';
        var groupedData = {};
        modelData.forEach(item => {
            if (!groupedData[item.group]) {
                groupedData[item.group] = [];
            }
            groupedData[item.group].push({ value: item.value, name: item.name });
        });

        for (const groupName in groupedData) {
            select2HTML += '<optgroup label="' + groupName + '">';
            groupedData[groupName].forEach(option => {
                select2HTML += '<option value="' + option.value + '">' + option.name + '</option>';
            });
            select2HTML += '</optgroup>';
        }
        select2HTML += '</select>';
        triggerCheckboxHTML += '<div style="margin-left: 10px;">' + select2HTML + '</div></div>';

        var targetDiv = $('div.tag_title[id^="div_indicator_tag_245_"]');
        targetDiv.find('.field_controls:first').after(triggerCheckboxHTML);

        // Initialize Select2 with the placeholder option
        setTimeout(function() {
            $('#modelSelect2').select2({
                width: '630px',
                placeholder: " -- Select a LLM model from this list -- ",
                allowClear: true // Optional: adds a clear button
            }).on('select2:open', function() {
                $('.select2-container').addClass('ddc-model-select2-container');
            });

            // Add the class immediately after initialization as well
            $('.select2-container').addClass('ddc-model-select2-container');

            // Set the initial selection to the placeholder (empty value)
            $('#modelSelect2').val(null).trigger('change');

        }, 100);

        var suggestionPopup;
        var analysisPopup;
        var spinner = $('#ddc-spinner');
        var aiAnalysisContent = ''; // To store the AI analysis message

        function createSuggestionModal() {
            suggestionPopup = $('<div id="ddc-suggestions-popup" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="true">' +
                '<div class="modal-dialog" role="document">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<h2 class="modal-title"><i class="fa-solid fa-user-gear"></i>&nbsp;Generative AI based DDC23 Suggestions Assistant</h2>' +
                '<div id="credit-info-placeholder"></div>' +
                '</div>' +
                '<div class="modal-body">' +
                '</div>' +
                '<div class="modal-footer ddc-modal-footer row">' +
                '  <div class="col-md-6" style="text-align: left;">' +
                '      <a href="http://www.l2c2.co.in"><img style="width: 100% !important;" src="data:image/png;base64,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" alt="L2C2 Technologies logo" /></a>' +
                '  </div><div class="col-md-6" style="text-align: right;">' +
                '<button type="button" class="btn btn-primary select-button">Select</button></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>');
            $('body').append(suggestionPopup);

            // Attach event listeners to the newly created modal
            suggestionPopup.on('hidden.bs.modal', function() {
                $('#get-ddc-suggestions').prop('checked', false);
                $('.modal-backdrop.fade.in').remove(); 
                destroySuggestionModal();
            });

            suggestionPopup.find('.cancel-button').on('click', function() {
                $('#ddc-suggestions-popup').modal('hide');
                $('#get-ddc-suggestions').prop('checked', false);
                destroySuggestionModal();
            });

            suggestionPopup.find('.select-button').on('click', function() {
                var selectedDdc = $('input[name="selected-ddc"]:checked').val();
                if (selectedDdc) {
                    $('[id^="tag_082_subfield_a_"]').val(selectedDdc);

                    var selectedModelName = $('#modelSelect2 option:selected').text();
                    var selectedModelValue = $('#modelSelect2').val();

                    let displayModelName = selectedModelName;
                    let displayModelValue = selectedModelValue;

                    const defaultModelValue = "meta-llama/llama-4-maverick";
                    let defaultModelInfo = modelData.find(model => model.value === defaultModelValue);
                    let defaultModelDisplayName = defaultModelInfo ? defaultModelInfo.name : "Llama 4 Maverick"; // Using "Maverick" for consistency if not found

                    if (!selectedModelValue) {
                        displayModelName = defaultModelDisplayName;
                        displayModelValue = defaultModelValue;
                    }

                    // Get the current date and time YYYY-MM-DD HH:MM:SS format
                    const now = new Date();
                    const year = now.getFullYear();
                    const month = String(now.getMonth() + 1).padStart(2, '0');
                    const day = String(now.getDate()).padStart(2, '0');
                    const hours = String(now.getHours()).padStart(2, '0');
                    const minutes = String(now.getMinutes()).padStart(2, '0');
                    const seconds = String(now.getSeconds()).padStart(2, '0');
                    const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

                    // Get the logged-in username and borrowernumber
                    var loggedInUsername = $('#logged-in-info-full > span.loggedinusername').text().trim();
                    var myAccountHref = $('a.toplinks[href*="moremember.pl?borrowernumber="]').attr('href');
                    var borrowernumber = myAccountHref ? myAccountHref.split('borrowernumber=')[1] : 'N/A';

                    const aiGenerationInfo = {
                        "notes": "AI generated DDC class no",
                        "model": displayModelName,
                        "id": displayModelValue || 'N/A',
                        "input_token": inputTokens,
                        "output_token": outputTokens,
                        "date": currentDateTime,
                        "user": loggedInUsername,
                        "borrowernumber": borrowernumber === 'N/A' ? null : parseInt(borrowernumber) 
                    };

                    // TODO : Using prettified output, so pay attention while parsing
                    const fiftyThirtyEightA = JSON.stringify(aiGenerationInfo, null, 2);

                    // Check if the 538$a field exists before setting its value
                    var fiftyThirtyEightAField = $('[id^="tag_538_subfield_a"]');
                    if (fiftyThirtyEightAField.length > 0) {
                        fiftyThirtyEightAField.val(fiftyThirtyEightA);
                    }

                    $('#ddc-suggestions-popup').modal('hide');
                    $('.modal-backdrop.fade.in').remove();
                    $('#get-ddc-suggestions').prop('checked', false);
                    destroySuggestionModal();
                } else {
                    alert('Please select a Dewey Decimal number.');
                }
            });

            // Adding event listener for the analysis link
            suggestionPopup.on('click', 'a[href="#showAnalysis"]', function(e) {
                e.preventDefault();
                showAnalysisModal();
            });
        }

        function createAnalysisModal() {
            analysisPopup = $('<div id="ai-analysis-popup" class="modal fade" tabindex="-1" role="dialog">' +
                '<div class="modal-dialog modal-lg" role="document">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<h3 class="modal-title"><i class="fa-solid fa-brain"></i>&nbsp;AI Analysis</h3>' +
                '</div>' +
                '<div class="modal-body">' +
                '<pre style="white-space: pre-wrap;" id="ai-analysis-modal-content"></pre>' +
                '</div>' +
                '<div class="modal-footer">' +
                '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>');
            $('body').append(analysisPopup);

            analysisPopup.on('hidden.bs.modal', function() {
                // Analysis modal is hidden, focus on suggestion modal
                if (suggestionPopup && suggestionPopup.is(':visible')) {
                    suggestionPopup.focus();
                }
                destroyAnalysisModal();
            });
        }

        function showAnalysisModal() {
            if (!analysisPopup) {
                createAnalysisModal();
            }
            $('#ai-analysis-modal-content').html(aiAnalysisContent);
            $('#ai-analysis-popup').modal('show');
        }

        function destroySuggestionModal() {
            if (suggestionPopup) {
                suggestionPopup.remove();
                suggestionPopup = null;
            }
        }

        function destroyAnalysisModal() {
            if (analysisPopup) {
                analysisPopup.remove();
                analysisPopup = null;
            }
        }

        function fetchOpenRouterCredits(callback) {
            $.ajax({
                url: "https://openrouter.ai/api/v1/credits",
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + openrouterApiKey
                },
                success: function(creditsData) {
                    if (creditsData && creditsData.data) {
                        callback(null, creditsData.data);
                    } else {
                        callback("Invalid response fetching credits", null);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    callback("Error fetching OpenRouter credits: " + textStatus + " - " + errorThrown, null);
                }
            });
        }

        function isValidISBN(isbn) {
            isbn = isbn.replace(/[^0-9X]/gi, '');

            if (isbn.length === 10) {
                let sum = 0;
                for (let i = 0; i < 9; i++) {
                    sum += parseInt(isbn[i]) * (10 - i);
                }
                let checkDigit = 11 - (sum % 11);
                if (checkDigit === 10) checkDigit = 'X';
                else if (checkDigit === 11) checkDigit = '0';
                return checkDigit === isbn[9].toUpperCase();
            } else if (isbn.length === 13) {
                let sum = 0;
                for (let i = 0; i < 12; i++) {
                    sum += parseInt(isbn[i]) * (i % 2 === 0 ? 1 : 3);
                }
                let checkDigit = (10 - (sum % 10)) % 10;
                return checkDigit === parseInt(isbn[12]);
            } else {
                return false;
            }
        }

        function getDeweySuggestions() {
            var titleA = titleAField.val().trim().replace(/:$/, '').replace(/\/$/, '');;
            var titleB = titleBField.val().trim().replace(/^:/, '').replace(/\/$/, '');
            var titleC = titleCField.val().trim().replace(/^\//, '');
            var isbn = isbnField.val().trim();
            var summary = "";
            if (summaryField.length > 0) {
                summary = summaryField.val().trim();
            }
            var fullTitle = titleA;

            if (titleB) {
                fullTitle += ' : ' + titleB;
            }
            if (titleC) {
                fullTitle += ' / ' + titleC;
            }

            var subjectTerms = [];
            $('[id^="tag_650_subfield_a"]').each(function() {
                var subject = $(this).val().trim();
                if (subject) {
                    subjectTerms.push(subject);
                }
            });

            var prompt = `Suggest suitable Dewey Decimal Classification numbers (based on DDC 23rd edition) for a bibliographic record with the following details:\n`;
            prompt += `Title: ${fullTitle}\n`;
            if (summary) {
                prompt += `Summary: ${summary}\n`;
            }
            if (isbn.trim() !== "" && isValidISBN(isbn)) {
                prompt += `ISBN: ${isbn}\n`;
            }
            if (subjectTerms.length > 0) {
                prompt += `Subject headings: ${subjectTerms.join(', ')}\n`;
            }
            prompt += `\n`;

            if ($('#get-ddc-suggestions').is(':checked') && (fullTitle.length > 5 || isbn.length > 9 || subjectTerms.length > 0)) {
                spinner.show();

                // Create the suggestion modal if NULL
                if (!suggestionPopup) {
                    createSuggestionModal();
                }

                suggestionPopup.find('.modal-body').empty();
                suggestionPopup.find('.modal-header h2.modal-title').nextAll().remove();
                suggestionPopup.find('.modal-header').append('<div id="credit-info-placeholder"></div>');
                suggestionPopup.find('.modal-footer').show();

                var selectedModelValue = $('#modelSelect2').val();
                $.ajax({
                    url: "https://openrouter.ai/api/v1/chat/completions",
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + openrouterApiKey,
                        "Content-Type": "application/json",
                        "HTTP-Referer": window.location.hostname
                    },
                    data: JSON.stringify({
                        model: selectedModelValue ? selectedModelValue : "meta-llama/llama-4-maverick", // Use selected model or default
                        messages: [{
                            role: "user",
                            content: prompt
                        }],
                        max_tokens: 1000,
                        temperature: 0.5
                    }),
                    success: function(data) {
                        spinner.hide(); 
                        console.log("OpenRouter API Response:", data);
                        aiAnalysisContent = data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content ? data.choices[0].message.content : '';

                        suggestionPopup.find('.modal-header h2.modal-title').after('<hr><h4>Title : ' + fullTitle + '</h4>');
                        var headerInfo = $('<div></div>');
                        if (data && data.model && data.usage) {
                            headerInfo.append('<p class="mb-0"><strong>Model: </strong>' + data.model + '&nbsp;&nbsp;<strong>Tokens used: </strong>Prompt - <em><span id="data_usage_prompt_tokens">' + data.usage.prompt_tokens + '</span></em>, Completion - <em><span id="data_usage_completion_tokens">' + data.usage.completion_tokens + '</span></em></p>');
                            inputTokens = data.usage.prompt_tokens;
							outputTokens = data.usage.completion_tokens;
                        } else { // reset trackers
                            inputTokens =  0;
                            outputTokens = 0;
                        }
                        suggestionPopup.find('.modal-header').append(headerInfo);

                        var responseText = data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content ? data.choices[0].message.content : '';
                        console.log("OpenRouter Message Content:", responseText);
                        var suggestions = [];
                        var ddcMatches = responseText.match(/(\d{3}(\.\d+)?)/g);
                        var mostSuitableDdcMatch = responseText.match(/(?:suitable|appropriate|suggested|likely|most|best|closest|nearest).*?(\d{3}(\.\d+)?)/i);
                        var mostSuitableDdc = mostSuitableDdcMatch && mostSuitableDdcMatch[1] ? mostSuitableDdcMatch[1].trim() : null;

                        if (ddcMatches) {
                            $.each(ddcMatches, function(index, ddc) {
                                suggestions.push({ ddc: ddc.trim() });
                            });
                        }

                        if (suggestions.length > 0) {
                            var uniqueSuggestions = [];
                            var seenDdcs = new Set();
                            $.each(suggestions, function(index, suggestion) {
                                if (!seenDdcs.has(suggestion.ddc)) {
                                    uniqueSuggestions.push(suggestion.ddc);
                                    seenDdcs.add(suggestion.ddc);
                                }
                            });

                            $.each(uniqueSuggestions, function(index, suggestion) {
                                var label = suggestion;
                                if (mostSuitableDdc && suggestion === mostSuitableDdc) {
                                    label += ' * (Most Suitable)';
                                }
                                var suggestionItem = $('<div class="ddc-suggestion"><input type="radio" name="selected-ddc" value="' + suggestion + '"> ' + label + '</div>');
                                suggestionPopup.find('.modal-body').append(suggestionItem);
                            });

                            suggestionPopup.find('.modal-body').append('<p style="line-height: 2rem; text-align: justify;"><strong><u>HINT</u></strong><em><ul><li style="line-height: 2rem;">Prompt built using 020$a, 245$, 245$b, 245$c, 520$a and 650$a (as available)</li><li style="line-height: 2rem;">Do not ***blindly*** follow the suggestions. The suggestion(s) are AI generated.</li><li style="line-height: 2rem;">If in doubt always consult the actual DDC.</li><li style="line-height: 2rem;">You can click <a href="#showAnalysis"><strong><u>here</u></strong></a> to learn more about how AI analyzed the data.</li></ul></em></p>');

                            $('#ddc-suggestions-popup').modal('show');

                            fetchOpenRouterCredits(function(error, creditsData) {
                                var creditInfoHTML = '';
                                if (creditsData) {
                                    creditInfoHTML = '<p class="mb-0"><strong>Total Credits:</strong> <em>US$ ' + creditsData.total_credits.toFixed(2) + '</em>&nbsp;&nbsp;<strong>Total Usage:</strong> <em>US$ ' + creditsData.total_usage.toFixed(2) + '</em></p>';
                                } else if (error) {
                                    console.error("Error fetching credits:", error);
                                    creditInfoHTML = '<p class="text-danger">Error fetching credit info.</p>';
                                }
                                $('#credit-info-placeholder').html(creditInfoHTML);
                            });

                        } else {
                            suggestionPopup.find('.modal-body').append('<p>No valid Dewey Decimal suggestions found.</p>');
                            $('#ddc-suggestions-popup').modal('show');
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        spinner.hide();
                        console.error("OpenRouter API Error:", errorThrown);
                        var errorMessage = '<strong>Error communicating with OpenRouter API.<br><br>Check if:</strong><ul><li style="line-height: 2rem;">your OpenRouter API key is valid</li><li style="line-height: 2rem;">your OpenRouter account has sufficient credits</li><li style="line-height: 2rem;">you have hit a <a href="https://openrouter.ai/docs/api-reference/limits" target="_blank">rate limit</a>&nbsp;<i class="fa-solid fa-link"></i>&nbsp;(if you are using a free usage slab)</li><li style="line-height: 2rem;">OpenRouter or your chosen LLM\'s provider is experiencing service outage</li></ul>';
                        suggestionPopup.find('.modal-body').append(errorMessage);
                        suggestionPopup.find('.modal-footer').hide(); // Hide the footer on error
                        $('#ddc-suggestions-popup').modal('show');
                    }
                });
            } else {
                if (suggestionPopup) {
                    $('#ddc-suggestions-popup').modal('hide');
                    $('.modal-backdrop.fade.in').remove(); 
                    destroySuggestionModal();
                }
            }
        }

        $('#get-ddc-suggestions').on('change', function() {
            if ($(this).is(':checked')) {
                getDeweySuggestions();
            } else {
                if (suggestionPopup) {
                    $('#ddc-suggestions-popup').modal('hide');
                    $('.modal-backdrop.fade.in').remove();
                    destroySuggestionModal();
                }
            }
        });
    }
});

/* ======================================================  */
