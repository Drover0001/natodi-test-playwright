1) What would you automate, and what would you keep manual for this product? Why?

My first candidates for automation would be the most business-critical and high-priority user flows.
I would also automate test cases that are executed frequently and require a lot of manual effort.
Tests with a high failure rate during test runs would also be good candidates for automation.

I would avoid automating functionality that is still unstable, actively under development, or frequently changing, as this could lead to a high number of flaky tests.


2) How would you make time-dependent tests deterministic?

I would avoid hardcoding dates or time slots such as "tomorrow at 10:00".
Instead, I would make the test dynamically find an available date and time slot before making a booking. For example, the test could iterate through available dates and select the first available slot that matches the required conditions.
This makes the test less dependent on changing test data and reduces the risk of failures when previously available slots become unavailable.

3) write one feature request instead

Title: No way to delete a saved comment

Steps to reproduce:
1) Open https://book.natodi.com/lightway.
2) Click the comment field below the "Дата та час" card.
3) Type text into the comment field.
4) Click "Зберегти".

Expected: A saved comment can be removed directly 

Actual: No delete control exists. Removing a comment requires opening the editor and blanking the field by hand, an indirect action nothing in the UI signals as "delete."

Severity: Low 

AI.md
1) What you delegated to it.

I delegated the initial creation of test case outlines to AI.
I provided acceptance criteria or user stories and asked it to suggest smoke tests, UI flows, and basic positive and negative scenarios. This helped me get test case templates that only needed to be further detailed.
I actively use AI tools and delegate tasks such as writing automated tests to them, as this significantly reduces the time required to automate test cases.
I also use AI to help with debugging failed tests and identifying and fixing the root cause of failures.

2) What you rewrote by hand, and why.

I always create documentation templates in advance that I want the AI to follow, based on the company's requirements and writing guidelines.
After that, I define clear specifications for the document and use my templates as a reference when creating the document.

After AI generates the code, I always review the code and its structure to ensure that it is clean, secure, has the correct assertions in place, uses appropriate locators, is maintainable, and avoids hardcoding.


3) One specific thing the model got wrong that you caught.

If I understood your question correctly
The main issues I have noticed are privacy concerns, which can lead to the leakage of sensitive data.
Another major issue is the enormous amount of context and constraints we need to provide to AI in order to get a response that matches our expectations. Otherwise, token usage can become excessive and the result may be unclear or inconsistent.

