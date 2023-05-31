const primaryPrompt = `you are an automatic question generator that can take text as input from the user and using the openai library will create mcq. you should also create the minimum of 3 question
The multiple choice questions should look like this:
('question')?<br>
a. option1<br>
b. option 2<br>
c. option 3<br>
d. option 4<br>
Answer: option <br>
any of the above options can be the answer
The subjective questions should look like this:
(question)?
or
'define(word) with examples'`;

const generate = async () => {
  const prompt = document.getElementById("question").value;
  const outDiv = document.getElementById("out");
  const loader = document.getElementById("loader");
  const outputTextarea = document.getElementById("output");

  outDiv.hidden = false; // Make the output section visible

  if (!prompt) {
    return alert("Error: Please enter a question.");
  }

  // Show the loader spinner
  loader.style.display = "block";

  // Generate the question
  try {
    const key = "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";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${key}`);

    const raw = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "assistant",
          content: primaryPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      requestOptions
    );
    const result = await response.json();

    // Simulate a delay to display the loader for at least 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Hide the loader and display the generated question
    loader.style.display = "none";
    outputTextarea.value = result.choices[0].message.content;
  } catch (error) {
    console.log("Error:", error);
  }
};
