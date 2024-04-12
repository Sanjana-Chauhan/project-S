var chatWindow = new Bubbles(document.getElementById("chat"), "chatWindow", {
    inputCallbackFn: function (o) {
        // add error conversation block & recall it if no answer matched
        var miss = function () {
            chatWindow.talk(
                {
                    "i-dont-get-it": {
                        says: [
                            "Sorry, I don't get it 😕. Pls repeat? Or you can just click below 👇"
                        ],
                        reply: o.convo[o.standingAnswer].reply
                    }
                },
                "i-dont-get-it"
            )
        }

        // do this if answer found
        var match = function (key) {
            setTimeout(function () {
                chatWindow.talk(convo, key) // restart current convo from point found in the answer
            }, 600)
        }

        // sanitize text for search function
        var strip = function (text) {
            return text.toLowerCase().replace(/[\s.,\/#!$%\^&\*;:{}=\-_'"`~()]/g, "")
        }

        // search function
        var found = false
        o.convo[o.standingAnswer].reply.forEach(function (e, i) {
            strip(e.question).includes(strip(o.input)) && o.input.length > 0
                ? (found = e.answer)
                : found ? null : (found = false)
        })
        found ? match(found) : miss()
    }
})

// conversation object stored in separate variable:
var convo = {
    // "ice" (as in "breaking the ice") is a required conversation object
    // that maps the first thing the bot will say to the user
    ice: {
        // "says" defines an array of sequential bubbles
        // that the bot will produce
        says: [
            "Hello!",
            "I'm your personal <em>Eco-Assistant</em>, How can I help you today?",
            "To begin, choose or type how you'd like this (example) conversation to proceed...",
            "<img src = resources/img/call-center.png />"
        ],
        // "reply" is an array of possible options the user can pick from
        // as a reply
        reply: [
            {
                question: "No, thanks",
                answer: "end"
            },
            {
                question: "Quizes", // label for the reply option
                answer: "quizHelp" // key for the next conversation object
            },
            {
                question: "Who are you?",
                answer: "aboutUs"
            },
            {
                question: "Contacts",
                answer: "contactUs"
            }
        ]
    },

    quizHelp: {
        says: [
            "Sorry, about that",
            "What are you having problems with?",
            "Text Based Quiz?",
            "Image Based Quiz?"
        ],
        reply: [
            {
                question: "Text Based",
                answer: "report_problem"
            },
            {
                question: "Image Based",
                answer: "report_problem"
            },
            {
                question: "Go Back!",
                answer: "ice"
            }
        ]
    },

    report_problem: {
        says: [
            "Sorry for the inconvenience.",
            "Kindly email us at mail@gmail.com"
        ],
        reply: [
            {
                question: "Go Back!",
                answer: "ice"
            }
        ]
    },

    aboutUs: {
        says: [
            "Thanks for being curious",
            "We are the group of 4 friends"
        ],
        reply: [
            {
                question: "Why you created this website?",
                answer: "why_we_created"
            },
            {
                question: "About your team?",
                answer: "about_our_team"
            },
            {
                question: "Go Back",
                answer: "ice"
            }
        ]
    },
    about_our_team: {
        says: [
            "Thanks for your interest",
            "Shikhar",
            "Yash",
            "Sanjana",
            "Vishesh"
        ],
        reply: [
            {
                question: "Go Back!",
                answer: "aboutUs"
            }
        ]
    },

    why_we_created: {
        says: [
            "Thanks for the interest",
            "Our mission is to save our planet and create a better future"
        ],
        reply: [
            {
                question: "Go Back!",
                answer: "aboutUs"
            }
        ]
    },

    contactUs: {
        says: [
            "Thank you for contacting Us",
            "You can mail us at mail@gmail.com"
        ],
        reply: [
            {
                question: "Go Back!",
                answer: "aboutUs"
            }
        ]
    },

    end: {
        says: [
            "Thanks for your time",
            "The chat is over, but you can <strong>start over</strong>"
        ],
        reply: [
            {
                question: "Start over 😁",
                answer: "ice"
            }
        ]
    }

} // end conversation object

// `.talk()` will get your bot to begin the conversation
chatWindow.talk(
    convo
)
