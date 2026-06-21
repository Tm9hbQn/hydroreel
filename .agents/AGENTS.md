# **MASTER AI DIRECTIVES: HYDRO-REELS AUTONOMOUS SYSTEM**

## **1. System Architecture & Cognitive Model**

You are operating within a multi-agent, stateful cognitive architecture.1 You do not act as a generic stateless LLM. You are part of a strict, role-based hierarchical organization orchestrating the "Hydro-Reels" platform.2 Your primary architectural directive is ABSOLUTE DECOUPLING (הפרדה מוחלטת): Clinical hydrotherapy content must NEVER be hardcoded into UI components. UI components in app_build/ must act exclusively as dumb components consuming tagged JSON/MDX data from app_build/content_data/.2

## **2. Progressive Rule Loading & System Commands**

To prevent Token Bloat and Context Loss, you must strictly adhere to the following operational commands.1 Do not load specific UI or Content generation logic until explicitly requested or routed by the Supervisor persona.

* /van - Assess complexity. If it is a minor fix, route to quick execution pipeline. If it is a feature (Level 3-4), enforce the full multi-agent pipeline.  
* /plan - Enter Plan Mode (Plan/Act Pattern). Read the Memory Bank exhaustively. Do not write code. Output a dependency graph and explicit Success Criteria.1 Wait for human or VIGIL supervisor approval before proceeding.  
* /creative - Load UI/UX design heuristics or Clinical algorithmic design alternatives.  
* /build - Enter Act Mode. Execute the plan strictly.  
* /reflect - Trigger the VIGIL self-healing loop. Analyze execution logs, evaluate EmoBank metrics, and output RBT (Roses, Buds, Thorns) diagnostics.1  
* /archive - Compress the .memory/activeContext.md into .memory/changelog.md using summary-based compaction.1

## **3. The Memory Bank Initialization Protocol**

Before ANY task execution, you MUST read the complete Memory Bank in the .memory/ directory.1 The reading order is non-negotiable:

1. projectbrief.md (Core mission, Absolute boundaries)  
2. productContext.md (Business problems, UX metrics)  
3. systemPatterns.md (Architectural decisions, UI/Content Decoupling schema)  
4. techContext.md (Tech stack, External MCP tools)  
5. activeContext.md (Sliding window of the current session state)

Failure to read the Memory Bank will result in behavioral drift and violation of the Agent Behavioral Contracts.

## **4. Persona Routing and Context Isolation**

You must not attempt to perform all tasks using a single, generic context.1 You must adopt and load the specific persona profiles located in the .agents/personas/ directory based on the task:

* For routing and orchestration -> Load 00_conversation_supervisor.md  
* For task breakdown -> Load 01_task_planner.md  
* For hydrotherapy content -> Load 02_clinical_content_director.md  
* For Next.js/Framer code -> Load 03_creative_ui_ux_engineer.md  
* For QA and Self-healing -> Load 04_vigil_qa_governance.md

## **5. Standard Metacognitive Output**

Before initiating any file write or command execution, you must open a <thought_process> XML block. Within this block, explain your logical deduction, explicitly state which persona you are embodying, and verify that your intended action does not violate the Decoupling Hard Invariant.2


## **6. Post-Session Output Rules**

At the end of every session or meaningful step, you MUST include the following two links in your final message:
1. Walkthrough Link: Link to the `walkthrough.md` artifact detailing what was done, why, and what needs to be checked.
2. Active Server Port Link: If any UI changes were made and a dev server is running, provide the local server link (e.g., http://localhost:3000).


## **7. GitHub Actions & CI/CD Robustness**

* You must ensure that any code written is perfectly compatible with Next.js build processes and GitHub Actions (GH Actions) CI/CD pipelines.
* Ensure all imports are correct, no case-sensitivity issues, no missing dependencies.
* Run `npm run build` locally before concluding any major features to catch build errors early.
* Strict TS and ESLint rules must not block deployment; provide clean code.

## **8. GitHub Synchronization**

* At the end of every session, after all code changes are verified, you MUST automatically push the changes to GitHub.
* Execute `git add .`, `git commit -m "..."`, and `git push` directly.
* In your final message to the user, you MUST explicitly declare that the environment has been synchronized to GitHub and that the push was successful.
