# Walkthrough: Agent Architecture Refactoring

## What was done
1. **Extracted Pedagogy Principles**:
   - Removed Section 1 ("עקרונות כתיבת התוכן (Deep Pedagogy)") from the global `design_and_pedagogy_principles.md` document.
   - Renumbered the remaining sections in the global document to reflect the change.
2. **Integrated Principles into Persona**:
   - Injected the extracted pedagogy principles directly into the `02_clinical_content_director.md` persona under the "Pedagogical Guidelines" section.
3. **GitHub Sync**:
   - Pushed all structural changes to the repository via GitHub Actions compatible commits.

## Why it was done
The user correctly identified an architectural duplication: the pedagogical constraints (such as the depth of content, avoidance of superficial terminology, and bite-sized learning) were located in a global design principles document, while the specific agent responsible for writing the content (`02_clinical_content_director`) had its own separate pedagogical guidelines. 

To improve the AI system's efficiency, reduce context noise, and prevent token bloat, the text-writing instructions were consolidated directly into the content director's persona. The global design principles document is now exclusively focused on overarching project goals like UI/UX flow, simulation interactivity, and QA standards.

## What needs to be checked
1. Check the `.agents/personas/02_clinical_content_director.md` file to verify the new unified pedagogical rules.
2. Check `.agents/design_and_pedagogy_principles.md` to ensure it only contains UI, Simulation, and QA principles.
