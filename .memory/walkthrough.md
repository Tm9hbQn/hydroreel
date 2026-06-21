# Walkthrough: Agent Architecture Refactoring

## What was done

### Phase 1: Content Pedagogy Refactoring
1. **Extracted Pedagogy Principles**:
   - Removed Section 1 ("עקרונות כתיבת התוכן (Deep Pedagogy)") from the global `design_and_pedagogy_principles.md` document.
   - Renumbered the remaining sections in the global document to reflect the change.
2. **Integrated Principles into Persona**:
   - Injected the extracted pedagogy principles directly into the `02_clinical_content_director.md` persona under the "Pedagogical Guidelines" section.

### Phase 2: Deduplication and Deep State Maintenance
1. **Deleted Redundant Directories**:
   - Entirely removed `.agents/workflows/` (duplicate of personas) and `.agents/contracts/` (duplicate invariants).
2. **Centralized Data Schema**:
   - Removed the copy-pasted "Learning Blocks" definitions from the Content and UI personas.
   - Inserted strict pointers instructing both personas to read `.memory/systemPatterns.md` as the single source of truth for data schemas.
3. **Formalized Hard Invariants**:
   - Moved the "Absolute Decoupling" and "No Wikipedia" rules to the very top of `systemPatterns.md` as "Hard Invariants".
4. **Enhanced AGENTS.md (System Constitution)**:
   - Added a **Global Rule Updates** directive enforcing that all user requests for global changes must be traced to their originating `.md` files and updated there.
   - Added a **Strict Compression Execution** directive enforcing that the agent automatically invokes `/archive` when `activeContext.md` exceeds 10 events.

### GitHub Sync
- Pushed all structural changes to the repository.

## Why it was done
The user identified significant architectural duplication and requested a deep analysis of state maintenance. The system suffered from having the same rules defined across YAML contracts, YAML workflows, Markdown personas, and Memory bank files. This bloated the context window and created high risk of architectural drift. Furthermore, the system lacked explicit self-maintenance rules forcing the agent to compress its memory logs or trace global instruction updates to their source files. 

By aggressively pruning redundant files and writing explicit "Global Update" and "Strict Compression" directives into the master `AGENTS.md` file, the AI is now forced to self-govern its memory and maintain a clean single source of truth for all rules.

## What needs to be checked
1. Check `AGENTS.md` (Section 9) to see the new strict state maintenance rules.
2. Check `systemPatterns.md` to see the new centralized Hard Invariants.
3. Verify that the `.agents/workflows` and `.agents/contracts` directories are completely gone.
