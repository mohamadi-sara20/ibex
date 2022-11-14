/* This software is licensed under a BSD license; see the LICENSE file for details. */

// Check that the object namespace hasn't been polluted by monkey patching (we
// use objects as hashtables without conscience).
for (var _ in { }) {
    assert(false, "ERROR: The JavaScript object namespace has been polluted (perhaps by a library such as prototype.js?)");
}

// *** Added By Sara ***

var backOrReloadPressed = false
var serverURL = 'http://37.32.9.104:3001/api'
// var serverURL = 'http://127.0.0.1:3001/api'

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.href);
    var script = document.createElement("script");
    script.innerHTML = backPress()
    document.head.appendChild(script);
    window.location.hash = "home"
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function isRegistered(id) {
    if (!id) {
        throw "error";
    }

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": serverURL + "/is-registered?id=" + id.toString(),
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
        }
    }

    return new Promise((resolve, reject) => {
        $.ajax(settings).done(function (response) {
            var isRegistered = response.data;
            resolve(isRegistered)
        });
    })
}

criticals = [
    ["f", "DashedSentence", {s: "Luis won a prize and invested in new equipment."}],
    ["f", "DashedSentence", {s: "Luis won a prize and therefore invested in new equipment."}],
    ["f", "DashedSentence", {s: "Christopher had no money and invested in new equipment."}, "Question",   {q: "Was it financially easy for Christopher to make the investment?", hasCorrect: true, randomOrder: true, as: ["No","Yes"]}],
    ["f", "DashedSentence", {s: "Christopher had no money and still invested in new equipment."}, "Question",   {q: "What did Christopher invest in?", as: ["new equipment", "new technology"],hasCorrect: true, randomOrder: true,}],
    ["f", "DashedSentence", {s: "Gabriela was a talented orator and volunteered to give a speech at a wedding."},"Question",   {hasCorrect: true, randomOrder: true,q: "Where did Gabriela volunteer to give a speech?", as: ["at a wedding", "at a reception"]}],
    ["f", "DashedSentence", {s: "Gabriela was a talented orator and therefore volunteered to give a speech at a wedding."}],
    ["f", "DashedSentence", {s: "Emily was very shy and volunteered to give a speech at a wedding."}],
    ["f", "DashedSentence", {s: "Emily was very shy and still volunteered to give a speech at a wedding."},"Question",   {hasCorrect: true, randomOrder: true,q: "Was it contrary to Emily's personality to volunteer to give a speech?", as: ["Yes", "No"]}],
    ["f", "DashedSentence", {s: "Natalia didn't read the essay questions properly and failed the exam last January."}],
    ["f", "DashedSentence", {s: "Natalia didn't read the essay questions properly and therefore failed the exam last January."},"Question",   {hasCorrect: true, randomOrder: true,q: "Did Natalia's test-taking skills affect her exam grade?", as: ["Yes", "No"]}],
    ["f", "DashedSentence", {s: "Samantha studied a lot and failed the exam last January."}],
    ["f", "DashedSentence", {s: "Samantha studied a lot and still failed the exam last January."}],
    ["f", "DashedSentence", {s: "Pedro wanted some outdoor exercise and climbed the mountain last weekend."}],
    ["f", "DashedSentence", {s: "Pedro wanted some outdoor exercise and therefore climbed the mountain last weekend."}],
    ["f", "DashedSentence", {s: "Brandon was feeling sick and climbed the mountain last weekend."},"Question",   {hasCorrect: true, randomOrder: true,q: "Was Brandon's health conducive to what he did last weekend?", as: ["No", "Yes"]}],
    ["f", "DashedSentence", {s: "Brandon was feeling sick and still climbed the mountain last weekend."}, "Question",   {hasCorrect: true, randomOrder: true,q: "When did Brandon climb the mountain?", as: ["last weekend", "last week"]}],
    ["f", "DashedSentence", {s: "Andrea wanted to support the local butcher and had beef for dinner."}, "Question",   {hasCorrect: true, randomOrder: true,q: "When did Andrea have beef?", as: ["for dinner", "for lunch"]}],
    ["f", "DashedSentence", {s: "Andrea wanted to support the local butcher and therefore had beef for dinner."}],
    ["f", "DashedSentence", {s: "Brittany was a vegetarian and had beef for dinner."}, "Question",   {hasCorrect: true, randomOrder: true,q: "Was beef an unusual meal for Brittany? ", as: ["No", "Yes"]}],
    ["f", "DashedSentence", {s: "Brittany was a vegetarian and still had beef for dinner."}],
    ["f", "DashedSentence", {s: "Emmanuel wanted to celebrate Halloween and went to a party last night."}],
    ["f", "DashedSentence", {s: "Emmanuel wanted to celebrate Halloween and therefore went to a party last night."}, "Question", {"q": "When did Emmanuel go to a party?",hasCorrect: true, randomOrder: true, as:["last night", "last week"]}],
    ["f", "DashedSentence", {s: "David was completely exhausted and went to a party last night."}],
    ["f", "DashedSentence", {s: "David was completely exhausted and still went to a party last night."},"Question", {hasCorrect: true, randomOrder: true,q: "Did David's energy level clash with his activities last night?", as: ["Yes", "No"]}],
    ["f", "DashedSentence", {s: "Juliana took a sleeping pill and slept very well last night."}, "Question", {q: "Were Juliana's sleeping pills ineffective?", hasCorrect: true, randomOrder: true,as:["No", "Yes"]}],
    ["f", "DashedSentence", {s: "Juliana took a sleeping pill and therefore slept very well last night."}],
    ["f", "DashedSentence", {s: "Taylor had a terrible flu and slept very well last night."}, "Question", {q: "When did Taylor sleep very well?",hasCorrect: true, randomOrder: true, as:["last night", "last week"]}],
    ["f", "DashedSentence", {s: "Taylor had a terrible flu and still slept very well last night."}],
    ["f", "DashedSentence", {s: "Felipe outperformed all other participants and won the singing contest last week."}],
    ["f", "DashedSentence", {s: "Felipe outperformed all other participants and therefore won the singing contest last week."}, "Question", {hasCorrect: true, randomOrder: true,q: "Was the outcome of the competition fair?", as: ["Yes", "No"]}],
    ["f", "DashedSentence", {s: "Zachary had a sore throat and won the singing contest last week."}],
    ["f", "DashedSentence", {s: "Zachary had a sore throat and still won the singing contest last week."}],
    ["f", "DashedSentence", {s: "Renata stumbled over her feet and lost the dance contest this summer."}],
    ["f", "DashedSentence", {s: "Renata stumbled over her feet and therefore lost the dance contest this summer."}, "Question", {hasCorrect: true, randomOrder: true,q: "When did Renata lose the dance contest?", as: ["this summer", "last summer"]}],
    ["f", "DashedSentence", {s: "Hannah performed very well and lost the dance contest this summer."}],
    ["f", "DashedSentence", {s: "Hannah performed very well and still lost the dance contest this summer."}, "Question", {hasCorrect: true, randomOrder: true,q: "Did Hannah perform well at the contest?", as: ["Yes", "No"]}],
    ["f", "DashedSentence", {s: "Ruben was a natural leader and applied for a chief executive position in June."}],
    ["f", "DashedSentence", {s: "Ruben was a natural leader and therefore applied for a chief executive position in June."}],
    ["f", "DashedSentence", {s: "William lacked managerial skills and applied for a chief executive position in June."}, "Question", {hasCorrect: true, randomOrder: true,q:"Was William qualified for the position he applied for?", as: ["No", "Yes"]}],
    ["f", "DashedSentence", {s: "William lacked managerial skills and still applied for a chief executive position in June."}],
    ["f", "DashedSentence", {s: "Destiny found an absolutely perfect sweater and bought it last weekend."}],
    ["f", "DashedSentence", {s: "Destiny found an absolutely perfect sweater and therefore bought it last weekend."}],
    ["f", "DashedSentence", {s: "Kayla hated the dress and bought it last weekend."}],
    ["f", "DashedSentence", {s: "Kayla hated the dress and still bought it last weekend."}, "Question", {hasCorrect: true, randomOrder: true,q: "Does Kayla only buy things she likes?", as: ["No", "Yes"]}],
    ["f", "DashedSentence", {s: "Caleb loved sailing and took a job as a fisherman in England."}, "Question", {q: "Did Caleb take a job that he was unlikely to enjoy?",hasCorrect: true, randomOrder: true, as:["No", "Yes"]}],
    ["f", "DashedSentence", {s: "Caleb loved sailing and therefore took a job as a fisherman in England."}],
    ["f", "DashedSentence", {s: "Tony was seasick and took a job as a fisherman in England."}, "Question", {hasCorrect: true, randomOrder: true,q: "Where did Tony take a job as a fisherman?", as: ["in England", "in Scotland"]}],
    ["f", "DashedSentence", {s: "Tony was seasick and still took a job as a fisherman in England."}],
    ["f", "DashedSentence", {s: "Sydney went to the gym every day and looked very athletic all year round."}],
    ["f", "DashedSentence", {s: "Sydney went to the gym every day and therefore looked very athletic all year round."}, "Question", {q:"Did Sydney stay in shape without any effort?",hasCorrect: true, randomOrder: true, as:["No", "Yes"]}],
    ["f", "DashedSentence", {s: "Stephanie never exercised and looked very athletic all year round."}],
    ["f", "DashedSentence", {s: "Stephanie never exercised and still looked very athletic all year round."}],
    ["f", "DashedSentence", {s: "Xavier always argued with his parents and didn't pay them a visit all last year."},  "Question", {q:"Was it logical for Xavier to avoid his parents?",hasCorrect: true, randomOrder: true, as:["Yes", "No"]}],
    ["f", "DashedSentence", {s: "Xavier always argued with his parents and therefore didn't pay them a visit all last year."}],
    ["f", "DashedSentence", {s: "Robert lived very close to his parents and didn't pay them a visit all last year."}],
    ["f", "DashedSentence", {s: "Robert lived very close to his parents and still didn't pay them a visit all last year."}],
    ["f", "DashedSentence", {s: "Kiara loved exotic pets and bought a tarantula last spring."}],
    ["f", "DashedSentence", {s: "Kiara loved exotic pets and therefore bought a tarantula last spring."}],
    ["f", "DashedSentence", {s: "Rachel was afraid of spiders and bought a tarantula last spring."},"Question", {hasCorrect: true, randomOrder: true,q: "Did Rachel choose a pet that made her feel uncomfortable?", as: ["Yes", "No"]}],
    ["f", "DashedSentence", {s: "Rachel was afraid of spiders and still bought a tarantula last spring."},"Question", {hasCorrect: true, randomOrder: true,q: "When did Rachel buy a tarantula? ", as: ["last spring", "last summer"]}],
    ["f", "DashedSentence", {s: "George wanted to help animals and decided to become a vet at age twenty."}],
    ["f", "DashedSentence", {s: "George wanted to help animals and therefore decided to become a vet at age twenty."}],
    ["f", "DashedSentence", {s: "Kyle had a cat allergy and decided to become a vet at age twenty."},"Question", {q: "At what age did Kyle decide to become a vet?",hasCorrect: true, randomOrder: true, as:["twenty", "thirty"]}],
    ["f", "DashedSentence", {s: "Kyle had a cat allergy and still decided to become a vet at age twenty."},"Question", {q: "Did Kyle's allergy impact his career choice?",hasCorrect: true, randomOrder: true, as:["No", "Yes"]}],
    ["f", "DashedSentence", {s: "Tiana was an adrenaline junkie and took up free-climbing last summer."},"Question", {hasCorrect: true, randomOrder: true,q:"Did free-climbing suit Tiana's personality?", as: ["Yes", "No"]}],
    ["f", "DashedSentence", {s: "Tiana was an adrenaline junkie and therefore took up free-climbing last summer."}, "Question", {hasCorrect: true, randomOrder: true,q: "When did Tiana take up free-climbing?", as: ["last summer", "this summer"]}],
    ["f", "DashedSentence", {s: "Nicole was scared of heights and took up free-climbing last summer."}],
    ["f", "DashedSentence", {s: "Nicole was scared of heights and still took up free-climbing last summer."}],
    ["f", "DashedSentence", {s: "Emmanuel was allergic to hops and never had a beer in his life."}],
    ["f", "DashedSentence", {s: "Emmanuel was allergic to hops and therefore never had a beer in his life."},"Question", {hasCorrect: true, randomOrder: true,q: "Did Emmanuel avoid beer because of its taste?", as: ["No", "Yes"]}],
    ["f", "DashedSentence", {s: "Alfred was German and never had a beer in his life."}],
    ["f", "DashedSentence", {s: "Alfred was German and still never had a beer in his life."}],
    ["f", "DashedSentence", {s: "Farrah hated Italian food and never had pasta for lunch."}],
    ["f", "DashedSentence", {s: "Farrah hated Italian food and therefore never had pasta for lunch."}, "Question", {hasCorrect: true, randomOrder: true,q: "Did Farrah avoid pasta for health reasons?", as: ["No", "Yes"]}],
    ["f", "DashedSentence", {s: "Alexa was Italian and never had pasta for lunch."}],
    ["f", "DashedSentence", {s: "Alexa was Italian and still never had pasta for lunch."}],
    ["f", "DashedSentence", {s: "Edward was a gun enthusiast and purchased weapons from an online store."},"Question", {hasCorrect: true, randomOrder: true,q: "Where did Edward purchase weapons?", as: ["from an online store","from a smuggler"] }],
    ["f", "DashedSentence", {s: "Edward was a gun enthusiast and therefore purchased weapons from an online store."}],
    ["f", "DashedSentence", {s: "Cody was a peace activist and purchased weapons from an online store."}, "Question", {hasCorrect: true, randomOrder: true,q: "Was purchasing weapons contradictory to Cody's ideology?", as: ["No", "Yes"]}],
    ["f", "DashedSentence", {s: "Cody was a peace activist and still purchased weapons from an online store."}],
    ["f", "DashedSentence", {s: "Betty didn't believe in global warming and protested against Greenpeace last week."}, "Question", {hasCorrect: true, randomOrder: true,q: "When did Betty protest against Greenpeace?", as: ["last week", "last month"]}],
    ["f", "DashedSentence", {s: "Betty didn't believe in global warming and therefore protested against Greenpeace last week."}, "Question", {hasCorrect: true, randomOrder: true,q: "When did Betty protest against Greenpeace?", as: ["last week", "last month"]}],
    ["f", "DashedSentence", {s: "Amber was an environmentalist and protested against Greenpeace last week."}],
    ["f", "DashedSentence", {s: "Amber was an environmentalist and still protested against Greenpeace last week."},"Question", {hasCorrect: true, randomOrder: true,q: "Was protesting against Greenpeace compatible with Amber's ideology?", as: ["No", "Yes"]}],
    ["f", "DashedSentence", {s: "Frank was an experienced chauffeur and easily found a job as a delivery driver this summer."}, "Question", {q: "Did Frank's past experience hinder him in finding a job?", hasCorrect: true, randomOrder: true,as:["No", "Yes"]}],
    ["f", "DashedSentence", {s: "Frank was an experienced chauffeur and therefore easily found a job as a delivery driver this summer."}],
    ["f", "DashedSentence", {s: "Cory had no driver's license and easily found a job as a delivery driver this summer."}],
    ["f", "DashedSentence", {s: "Cory had no driver's license and still easily found a job as a delivery driver this summer."},"Question", {hasCorrect: true, randomOrder: true,q: "When did Cory find a job as a delivery driver?", as: ["this summer", "this spring"]}],
    ["f", "DashedSentence", {s: "Dorothy had extensive experience with toddlers and was hired as a nursery assistant last year."}],
    ["f", "DashedSentence", {s: "Dorothy had extensive experience with toddlers and therefore was hired as a nursery assistant last year."}, "Question", {q: "Did Dorothy's experience help her find a job?", hasCorrect: true, randomOrder: true,as:["Yes","No"]}],
    ["f", "DashedSentence", {s: "Courtney despised children and was hired as a nursery assistant last year."}],
    ["f", "DashedSentence", {s: "Courtney despised children and still was hired as a nursery assistant last year."}],
    ["f", "DashedSentence", {s: "Harold loved dissecting literature and signed a contract as a literary critic in August."}],
    ["f", "DashedSentence", {s: "Harold loved dissecting literature and therefore signed a contract as a literary critic in August."},"Question", {q: "Was Harold's profession in line with his personal interests?", hasCorrect: true, randomOrder: true,as:["Yes", "No"]}],
    ["f", "DashedSentence", {s: "Brian didn't enjoy reading and signed a contract as a literary critic in August."}],
    ["f", "DashedSentence", {s: "Brian didn't enjoy reading and still signed a contract as a literary critic in August."}],
    ["f", "DashedSentence", {s: "Helen wanted to keep up with technology and bought the newest laptop last winter."}, "Question", {q: "When did Helen buy the laptop?",hasCorrect: true, randomOrder: true, as:["this winter", "last winter"]}],
    ["f", "DashedSentence", {s: "Helen wanted to keep up with technology and therefore bought the newest laptop last winter."}],
    ["f", "DashedSentence", {s: "Rebecca was a complete technophobe and bought the newest laptop last winter."}, "Question", {q:"Was it typical for Rebecca to buy the newest laptop?",hasCorrect: true, randomOrder: true, as:["No", "Yes"]}],
    ["f", "DashedSentence", {s: "Rebecca was a complete technophobe and still bought the newest laptop last winter."}],
    ["f", "DashedSentence", {s: "Billy was under strong peer pressure and took up smoking a year ago."}],
    ["f", "DashedSentence", {s: "Billy was under strong peer pressure and therefore took up smoking a year ago."}],
    ["f", "DashedSentence", {s: "Jose was very health-conscious and took up smoking a year ago."}, "Question", {q: "When did Jose take up smoking?",hasCorrect: true, randomOrder: true, as:["a year ago", "a month ago"]}],
    ["f", "DashedSentence", {s: "Jose was very health-conscious and still took up smoking a year ago."},"Question", {q: "Was smoking inconsistent with Jose's lifestyle?",hasCorrect: true, randomOrder: true, as:["Yes", "No"]}],
    ["f", "DashedSentence", {s: "Eugene wanted to spread his religion and became a priest at age thirty."}, "Question", {q: "Did Eugene's ideals influence his career choice?", hasCorrect: true, randomOrder: true,as:["Yes", "No"]}],
    ["f", "DashedSentence", {s: "Eugene wanted to spread his religion and therefore became a priest at age thirty."}, "Question", {q: "At what age did Eugene become a priest?",hasCorrect: true, randomOrder: true, as:["thirty", "twenty"]}],
    ["f", "DashedSentence", {s: "Tim was an atheist and became a priest at age thirty."}],
    ["f", "DashedSentence", {s: "Tim was an atheist and still became a priest at age thirty."}, "Question", {q: "At what age did Tim become a priest?",hasCorrect: true, randomOrder: true, as:["thirty", "twenty"]}],
    ["f", "DashedSentence", {s: "Alice enjoyed new sporting challenges and ran her first marathon last month."}],
    ["f", "DashedSentence", {s: "Alice enjoyed new sporting challenges and therefore ran her first marathon last month."}, "Question", {hasCorrect: true, randomOrder: true,q:"Was Alice forced to run her first marathon?", as: ["No", "Yes"]}],
    ["f", "DashedSentence", {s: "Danielle had a sprained ankle and ran her first marathon last month."}, "Question", {q: "When did Danielle run her first marathon?", hasCorrect: true, randomOrder: true,as:["last month", "last week"]}],
    ["f", "DashedSentence", {s: "Danielle had a sprained ankle and still ran her first marathon last month."}],
    ["f", "DashedSentence", {s: "Barbara spent a lot of time preparing and delivered an excellent speech at the conference."}, "Question", {q: "Was it worth Barbara's time to prepare for the speech?",hasCorrect: true, randomOrder: true, as:["Yes", "No"]}],
    ["f", "DashedSentence", {s: "Barbara spent a lot of time preparing and therefore delivered an excellent speech at the conference."}, "Question", {q: "Where did Barbara deliver a speech?", hasCorrect: true, randomOrder: true,as:["at the conference", "at the workshop"]}],
    ["f", "DashedSentence", {s: "Jasmin was drunk and delivered an excellent speech at the conference."}],
    ["f", "DashedSentence", {s: "Jasmin was drunk and still delivered an excellent speech at the conference."}],
    ["f", "DashedSentence", {s: "Gerald wanted to raise funds for a charity and gave a piano concert last night."}],
    ["f", "DashedSentence", {s: "Gerald wanted to raise funds for a charity and therefore gave a piano concert last night."}],
    ["f", "DashedSentence", {s: "Patrick had a broken arm and gave a piano concert last night."}, "Question", {hasCorrect: true, randomOrder: true,q: "Was Patrick's health conducive to his performance?", as: ["No", "Yes"]}],
    ["f", "DashedSentence", {s: "Patrick had a broken arm and still gave a piano concert last night."}, "Question", {q: "When did Patrick give a piano concert?",hasCorrect: true, randomOrder: true, as:["last night", "last week"]}],
    ["f", "DashedSentence", {s: "Joan had perfect pitch and was hired as a music critic for a local newspaper."}, "Question", {q: "Who hired Joan?",hasCorrect: true, randomOrder: true, as:["a local newspaper","a major newspaper"]}],
    ["f", "DashedSentence", {s: "Joan had perfect pitch and therefore was hired as a music critic for a local newspaper."}],
    ["f", "DashedSentence", {s: "Katherine couldn't read music and was hired as a music critic for a local newspaper."}],
    ["f", "DashedSentence", {s: "Katherine couldn't read music and still was hired as a music critic for a local newspaper."}, "Question", {hasCorrect: true, randomOrder: true,q: "Was Katherine unqualified for her job?", as: ["Yes", "No"]}],
    ["f", "DashedSentence", {s: "Ivan was fluent in several languages and worked as an interpreter in his student days."}, "Question", {q: "Was Ivan predisposed to work as an interpreter?", hasCorrect: true, randomOrder: true,as:["Yes", "No"]}],
    ["f", "DashedSentence", {s: "Ivan was fluent in several languages and therefore worked as an interpreter in his student days."}],
    ["f", "DashedSentence", {s: "Hartmut wasn't good at languages and worked as an interpreter in his student days."}],
    ["f", "DashedSentence", {s: "Hartmut wasn't good at languages and still worked as an interpreter in his student days."}],
    ["f", "DashedSentence", {s: "Doris was an introvert and couldn't find a partner when she was younger."}],
    ["f", "DashedSentence", {s: "Doris was an introvert and therefore couldn't find a partner when she was younger."}, "Question", {q: "Did Doris' personality facilitate her love life? ", hasCorrect: true, randomOrder: true,as:["No", "Yes"]}],
    ["f", "DashedSentence", {s: "Alexandra was very attractive and couldn't find a partner when she was younger."}],
    ["f", "DashedSentence", {s: "Alexandra was very attractive and still couldn't find a partner when she was younger."}],
    ["f", "DashedSentence", {s: "Albert had heavy family obligations and never left his village in his life."}, "Question",{q: "Did Albert have the freedom to leave his village?", hasCorrect: true, randomOrder: true,as:["No", "Yes"]}],
    ["f", "DashedSentence", {s: "Albert had heavy family obligations and therefore never left his village in his life."}],
    ["f", "DashedSentence", {s: "Shaun was extremely open-minded and never left his village in his life."}],
    ["f", "DashedSentence", {s: "Shaun was extremely open-minded and still never left his village in his life."}],
    ["f", "DashedSentence", {s: "Rosemary wanted to lose weight and committed to regular running with the group."}],
    ["f", "DashedSentence", {s: "Rosemary wanted to lose weight and therefore committed to regular running with the group."}],
    ["f", "DashedSentence", {s: "Morgan was a couchpotato and committed to regular running with the group."},"Question", {q: "Did Morgan's lifestyle facilitate her new commitment?",hasCorrect: true, randomOrder: true, as:["No", "Yes"] }],
    ["f", "DashedSentence", {s: "Morgan was a couchpotato and still committed to regular running with the group."}],
    ["f", "DashedSentence", {s: "The lawyer didn't show up for court and lost two cases last week."}],
    ["f", "DashedSentence", {s: "The lawyer didn't show up for court and therefore lost two cases last week."}],
    ["f", "DashedSentence", {s: "Jeremy was an experienced lawyer and lost two cases last week."}, "Question", {q: "When did Jeremy lose two cases?", hasCorrect: true, randomOrder: true,as:["last week", "last year"]}],
    ["f", "DashedSentence", {s: "Jeremy was an experienced lawyer and still lost two cases last week."}, "Question", {q: "Did Jeremy lose the cases because of his level of experience?",hasCorrect: true, randomOrder: true, as:["No", "Yes"]}],
    ["f", "DashedSentence", {s: "Ruth had forgotten her scarf and was freezing during the trip."}, "Question", {q: "Was Ruth comfortable without her scarf?", hasCorrect: true, randomOrder: true,as:["No", "Yes"]}],
    ["f", "DashedSentence", {s: "Ruth had forgotten her scarf and therefore was freezing during the trip."}, "Question", {q:"When was Ruth freezing?",hasCorrect: true, randomOrder: true, as:["during the trip", "during the talk"]}],
    ["f", "DashedSentence", {s: "Melissa was wearingher warmest jacket and was freezing during the trip."}],
    ["f", "DashedSentence", {s: "Melissa was wearingher warmest jacket and still was freezing during the trip."}, "Question", {q: "When was Melissa freezing?", hasCorrect: true, randomOrder: true,as:["during the trip", "during the talk"]}],
    ["f", "DashedSentence", {s: "Lawrence wanted to save people's lives and decided to be a surgeon at a hospital."}],
    ["f", "DashedSentence", {s: "Lawrence wanted to save people's lives and therefore decided to be a surgeon at a hospital."}, "Question", {q:"Did Lawrence's career fulfill his personal aspiration?", hasCorrect: true, randomOrder: true,as:["Yes", "No"]}],
    ["f", "DashedSentence", {s: "Jesse couldn't tolerateblood and decided to be a surgeon at a hospital."}],
    ["f", "DashedSentence", {s: "Jesse couldn't tolerateblood and still decided to be a surgeon at a hospital."}],
    ["f", "DashedSentence", {s: "Dolores was craving Indian food and had curry last night."}, "Question", {q: "When did Dolores have curry?",hasCorrect: true, randomOrder: true, as:["last night", "this night"]}],
    ["f", "DashedSentence", {s: "Dolores was craving Indian food and therefore had curry last night."}],
    ["f", "DashedSentence", {s: "Sofia couldn't stand spicy dishes and had curry last night."}],
    ["f", "DashedSentence", {s: "Sofia couldn't stand spicy dishes and still had curry last night."}, "Question", {q: "Was curry the ideal meal for Sofia?",hasCorrect: true, randomOrder: true, as:["No", "Yes"]}],
    ["f", "DashedSentence", {s: "Leonard was hungry and ate a whole pizza for lunch."}],
    ["f", "DashedSentence", {s: "Leonard was hungry and therefore ate a whole pizza for lunch."}, "Question", {q: "When did Leonard eat a whole pizza?",hasCorrect: true, randomOrder: true,as:["for lunch", "for dinner"]}],
    ["f", "DashedSentence", {s: "Juan was nauseous and ate a whole pizza for lunch."}, "Question", {q:"Was Juan's lunch incompatible with his health?",hasCorrect: true, randomOrder: true, as:["Yes", "No"]}],
    ["f", "DashedSentence", {s: "Juan was nauseous and still ate a whole pizza for lunch."}],
    ["f", "DashedSentence", {s: "Frances was eager for feedback and engaged in a friendly chat with the customers."}],
    ["f", "DashedSentence", {s: "Frances was eager for feedback and therefore engaged in a friendly chat with the customers."}],
    ["f", "DashedSentence", {s: "Monica was in a bad mood and engaged in a friendly chat with the customers."},"Question", {hasCorrect: true, randomOrder: true,q: "With whom did Monica engage in a friendly chat?", as: ["with the customers", "with the visitors"]}],
    ["f", "DashedSentence", {s: "Monica was in a bad mood and still engaged in a friendly chat with the customers."}, "Question", {q: "Did Monica manage to overcome her mood at work?", hasCorrect: true, randomOrder: true,as:["Yes", "No"]}],
    ["f", "DashedSentence", {s: "Marvin wanted to travel to Paris and signed up for French lessons last winter."}, "Question", {hasCorrect: true, randomOrder: true,q: "Did Marvin prepare for his trip to Paris?", as: ["Yes", "No"]}],
    ["f", "DashedSentence", {s: "Marvin wanted to travel to Paris and therefore signed up for French lessons last winter."}],
    ["f", "DashedSentence", {s: "Pierre was a native and signed up for French lessons last winter."}],
    ["f", "DashedSentence", {s: "Pierre was a native and still signed up for French lessons last winter."}, "Question", {q: "When did Pierre sign up for French lessons?", hasCorrect: true, randomOrder: true,as:["last winter", "last summer"]}],
    ["f", "DashedSentence", {s: "Joyce needed to burn some calories and went for a jog along the beachfront."}, "Question", {q: "Where did Joyce go for a jog?", hasCorrect: true, randomOrder: true,as:["along the beachfront", "along the river"]}],
    ["f", "DashedSentence", {s: "Joyce needed to burn some calories and therefore went for a jog along the beachfront."}, "Question", {q: "Did Joyce go for a jog for fun?",hasCorrect: true, randomOrder: true, as:["No", "Yes"]}],
    ["f", "DashedSentence", {s: "Valeria had a badstomach ache and went for a jog along the beachfront."}],
    ["f", "DashedSentence", {s: "Valeria had a badstomach ache and still went for a jog along the beachfront."}],
    ["f", "DashedSentence", {s: "Bernard had a dull sense of humor and never made anybody laugh during his shows."}],
    ["f", "DashedSentence", {s: "Bernard had a dull sense of humor and therefore never made anybody laugh during his shows."}],
    ["f", "DashedSentence", {s: "Travis was a comedian and never made anybody laugh during his shows."}, "Question", {q: "Was Travis a rather unsuccessful comedian?",hasCorrect: true, randomOrder: true, as:["Yes", "No"]}],
    ["f", "DashedSentence", {s: "Travis was a comedian and still never made anybody laugh during his shows."}]
]

function getCount(id) {
    if (!id) {
        throw "error";
    }

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": serverURL + "/count",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
        }
    }

    return new Promise((resolve, reject) => {
        $.ajax(settings).done(function (response) {
            // var count = response.data;
            const count = response.data;
            resolve(count)
        });
    })
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

function register(id) {
    var settings = {
        "url": serverURL + "/register",
        "method": "POST",
        "type": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({"id": id.toString()}),
    };

    return new Promise((resolve, reject) => {
        $.ajax(settings).done(function (response) {
            resolve(response);
        });
    })
}


function backPress(){
    window.onhashchange = function(url){
        window.location.reload("true")
        return  "Your work will be lost.";
    }
    window.onbeforeunload = function(url) {
        window.location.replace(url["oldURL"])
        return "Your work will be lost.";
     };
}


//

$(document).ready(function () {

// Preload chunks.
var loadingMessage = null;
var alreadyLoaded = false;
setTimeout(function () {
    if (alreadyLoaded)
        return;
    loadingMessage = $("<p>").text(conf_loadingMessage);
    $("<body>").append(loadingMessage);
}, 500);

$.ajax({
    url: __server_py_script_name__ + '?allchunks=1',
    cache: false,
    dataType: 'text', // We're still trying to support IE 6 LOL
    success: function (data) {
        if (alreadyLoaded && loadingMessage)
            loadingMessage.remove();
        alreadyLoaded = true;

        var cs;
        try {
            var o = JSON.parse(data);
            if (typeof(o) != "object")
                throw "error";
            setChunks(o);
            var id = getUrlParameter("PROLIFIC_PID");
            if (!id) {
                $('body').append($('<p>', {
                    text: conf_invalidUrl,
                    style: "border-radius: 40px; background-color: #D3D3D3 !important; margin: 15rem; padding: 10rem; font-size: 1.2rem; text-align:center; font-family:Courier; font-weight: bold; background-color:white;"
                }));
            }
            isRegistered(id)
              .then(function(isRegistered) {
                  if (isRegistered) {
                      $('body').append($('<p>', {
                          text: conf_alreadyRegisteredErrorMessage,
                          style: "border-radius: 40px; background-color: #D3D3D3 !important; margin: 15rem; padding: 10rem; font-size: 1.2rem; text-align:center; font-family:Courier; font-weight: bold; background-color:white;"
                        }));
                  } else {
                      startup();
                  }
              })
        }
        catch (e) {
            $("<body>").append($("<p>").text(conf_loadingFatalErrorMessage));
        }
    },
    error: function () {
        if (loadingMessage)
            loadingMessage.remove()
        alreadyLoaded = true;
        $("<body>").append($("<p>").text(conf_loadingFatalErrorMessage));
    }
});

});

function startup() {

    var practiceBox;
    var inner;
    var mainTable; // Only set if conf_centerItems.

    function createMainTable() {
        // Note that this statement sets the 'inner' var.
        var newt =
          $(document.createElement("table"))
            .attr('align', 'center') // IE sucks.
            .append($(document.createElement("tr"))
              .append(inner = $(document.createElement("td"))));

        if (mainTable) {
            mainTable.replaceWith(newt);
        } else {
            $("body").append(newt);
        }
        mainTable = newt;
    }

    function renewInner() {
        if ((!conf_centerItems) || conf_showOverview) {
            var newdiv = $(document.createElement("div")).addClass("lindent");
            newdiv.className = "lindent";
            if (inner) {
                inner.replaceWith(newdiv);
            } else {
                $("body").append(newdiv);
            }
            inner = newdiv;
        } else {
            // Have to recreate the entire table, or Firefox 2 will do weird
            // things.
            createMainTable();
        }
        inner.css('clear', "both");
        if ((!conf_showOverview) && conf_practiceItemTypes && conf_practiceItemTypes.length > 0)
            inner.append(practiceBox = $(document.createElement("p")).addClass("practice-box"));
    }

    renewInner();

    var counter = __counter_value_from_server__;
    if (typeof (counterOverride) != "undefined") {
        assert(!isNaN(parseInt(counterOverride)), "Bad value for 'counterOverride' config variable.");
        counter = parseInt(counterOverride);
    }

// Convert the "defaults" variable to a hash.
    var ht_defaults = {};
    if (typeof (defaults) != "undefined") {
        assert_is_arraylike(defaults, "'defaults' variable must be set to an Array.");
        assert(defaults.length % 2 == 0, "'defaults' Array must have an even number of elements.");

        for (var i = 0; i < defaults.length; i += 2) {
            assert(typeof (defaults[i]) == "string", "Odd members of the 'defaults' array must be strings naming controllers.");
            assert_is_dict(defaults[i + 1], "Even members of the 'defaults' array must be dictionaries.");
            if (typeof (ht_defaults[defaults[i]]) != "undefined")
                assert(false, "Duplicate entry in 'defaults' for '" + defaults[i] + "'.");
            ht_defaults[defaults[i]] = defaults[i + 1];
        }
    }

    function Element(itemNumber, elementNumber, type, group, controller, options) {
        this.itemNumber = itemNumber;
        this.elementNumber = elementNumber;
        this.type = type;
        this.group = group;
        this.controller = controller;
        this.options = options;
    }

    var COUNTER_HAS_ALREADY_BEEN_UPDATED = false;
    $.widget("ui.__SetCounter__", {
        _init: function () {
            var q = 'inc-1'; // Default
            if (this.options.inc) {
                assert(typeof (this.options.inc) == "number", "Bad value for option 'inc' of __SetCounter__");
                q = 'inc-' + this.options.inc;
            } else if (this.options.set) {
                assert(typeof (this.options.set) == "number", "Bad value for option 'set' of __SetCounter__");
                q = this.options.set + '';
            }

            $.ajax({
                url: __server_py_script_name__ + '?setsquare=' + q,
                cache: false,
                success: function () {
                    if (COUNTER_HAS_ALREADY_BEEN_UPDATED) {
                        alert("WARNING: Have you used __SetCounter__ twice?");
                    }
                    COUNTER_HAS_ALREADY_BEEN_UPDATED = true;
                },
                error: function () {
                    if (console.log) {
                        console.log("WARNING: Error updating counter using __SetCounter__ controller");
                    }
                }
            });

            this.options._finishedCallback();
        }
    });
    ibex_controller_set_properties("__SetCounter__", {
        obligatory: [],
        countsForProgressBar: false,
        htmlDescription: function () {
            return $("<div>").text("[SET COUNTER]");
        }
    });

    (function () {
        var RESULTS_HAVE_ALREADY_BEEN_SENT = false;
        $.widget("ui.__SendResults__", {
            _init: function () {
                if (RESULTS_HAVE_ALREADY_BEEN_SENT)
                    alert("WARNING: Results have already been sent once. Did you forget to set the 'manualSendResults' config option?");

                var spinSpan;
                this.element.append($("<table>")
                  .addClass("sending-results")
                  .append($("<tr>")
                    .append($("<td>").text(conf_sendingResultsMessage + " "))
                    .append($("<td>").css('width', '1.5em').append(spinSpan = $("<span>").text("/")))));

                // Clear "practice" notice if it's still up.
                if (practiceBox)
                    practiceBox.hide();

                var spinChars = ["\u2013", "\\", "|", "/"];
                var spinCharsPos = 0;
                var spinSpanShouldBeSpinning = true;
                var t = this;

                function timerCallback() {
                    if (!spinSpanShouldBeSpinning) return;

                    spinSpan.text(spinChars[spinCharsPos]);
                    ++spinCharsPos;
                    if (spinCharsPos == spinChars.length) spinCharsPos = 0;
                    t.options._utils.setTimeout(timerCallback, 200);
                } // Note that this will be cleaned up automatically.
                t.options._utils.setTimeout(timerCallback, 200);

                sendResults(allResults,
                  function () {
                      var id = getUrlParameter("PROLIFIC_PID");
                      //todo handle error
                      register(id)
                        .then(function (payload) {
                            RESULTS_HAVE_ALREADY_BEEN_SENT = true;
                            spinSpanShouldBeSpinning = false;
                            t.element.empty().append($("<div>").addClass("sending-results").text(conf_completionMessage));
                            t.options._finishedCallback();
                        })
                        .catch(function (err) {
                            $('body').append($('<p>', {
                                text: conf_resultSubmissionFailed,
                                style: "padding: 10px; font-size: 1.2rem;text-align:center; font-weight: bold;"
                            }));
                        })

                  },
                  function () {
                      spinSpanShouldBeSpinning = false;
                      t.element.empty()
                        .append($("<div>").addClass("sending-results").text(conf_completionErrorMessage + " ")
                          .append($("<span>")
                            .addClass("retry")
                            .text('Retry')
                            .click(function (e) {
                                e.preventDefault();
                                t.element.empty();
                                t._init();
                            })));
                  });
            }
        });
    })();
    ibex_controller_set_properties("__SendResults__", {
        obligatory: [],
        countsForProgressBar: false,
        htmlDescription: function () {
            return $("<div>").text("[SEND RESULTS]");
        }
    });

// Now create our initial list of item sets (lists of Elements), merging in default options.
    assert(typeof (items) != "undefined", "You must define the 'items' variable.");
    assert_is_arraylike(items, "The 'items' variable must be set to an Array.");

// firstHalf = []
// secondHalf = []

// for (let i=0; i < criticals.length; i++){
//     if (i%2 == 0){
//         firstHalf.push(criticals[i])
//     }
//     else secondHalf.push(criticals[i])
// }


// var id = getUrlParameter("PROLIFIC_PID");
// var count = -1;
// var userCountPromise = getCount(id)

// userCountPromise.then((value) => {
//         count = value
//         if (count > -1){
//             if(count%2 == 0) items = [...items, firstHalf]
//             else items = [...items, secondHalf]
//         }
//         else throw "error"

// }).catch(err => alert("Failed to contact server"));


    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(window.location.href);
        var script = document.createElement("script");
        document.head.appendChild(script);
        window.location.hash = "home"
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    var id = getUrlParameter("PROLIFIC_PID");
    var count = -1;
    var userCountPromise = getCount(id)


    userCountPromise.then((value) => {
        count = value
        if (count > -1) {
            // console.log("!!!!!!")
            if (count % 2 == 0) items = firstHalf.concat(items)
            else items = secondHalf.concat(items)

            // console.log("ITEMS >>>>>>>>>>>> ",items);

            var listOfElementSets = [];
            var itemNumber = 0;
            $.each(items, function (_, it) {
                assert_is_arraylike(it, "Every element in the 'items' Array must be an Array.");

                assert(((it.length - 1) % 2) == 0, "Following the item/group specifier, each element of the 'items' array must contain an even number of elements.")
                var typeAndGroup = it[0];
                var currentElementSet = [];
                for (var setIndex = 1, elementNumber = 0; setIndex < it.length; setIndex += 2, ++elementNumber) {
                    var controller = it[setIndex];
                    var options = it[setIndex + 1];

                    var type;
                    var group = null;
                    assert(typeof (typeAndGroup) == "object" || typeof (typeAndGroup) == "number" || typeof (typeAndGroup) == "string",
                      "Type and group specifier must be an Array, number or string");
                    if (typeof (typeAndGroup) == "object") {
                        assert(typeAndGroup.length == 2, "Type and group specifier must have two elements");
                        type = typeAndGroup[0];
                        group = typeAndGroup[1];
                    } else {
                        type = typeAndGroup;
                    }

                    var opts = ht_defaults[controller];
                    opts = merge_dicts(opts, options);

                    // Check that all obligatory options have been specified.
                    if (ibex_controller_get_property(controller, "obligatory")) {
                        assert_is_arraylike(ibex_controller_get_property(controller, "obligatory"), "The 'obligatory' option field must be an Array of strings.");
                        $.each(ibex_controller_get_property(controller, "obligatory"), function (_, o) {
                            assert(typeof (o) == "string", "All members of the Array value of the 'obligatory' option must be strings.");
                            assert(opts[o] != undefined, "The obligatory option '" + o + "' was not specified for the controller" + controller);
                        });
                    }

                    currentElementSet.push(new Element(itemNumber, elementNumber, type, group, controller, opts));
                }
                currentElementSet.type = type;
                currentElementSet.group = group;
                listOfElementSets.push(currentElementSet);

                ++itemNumber;
            });

            var runningOrder = runShuffleSequence(mungGroups(listOfElementSets, counter), conf_shuffleSequence);
            assert(runningOrder.length > 0 && runningOrder[0].length > 0,
              "There must be some items in the running order!");

// Hook to allow manual manipulation of the running order in the data file.
            if (conf_modifyRunningOrder) {
                // We now can't share structure between element sets.
                for (var i = 0; i < runningOrder.length; ++i) {
                    var l = new Array(runningOrder[i].length);
                    for (var j = 0; j < l.length; ++j)
                        l[j] = runningOrder[i][j];
                    runningOrder[i] = l;
                }

                runningOrder = conf_modifyRunningOrder(runningOrder);
            }

// Not necessary to set item/element numbers properly as the __SendResults__ controller
// doesn't add any lines to the results file.
            if (!conf_manualSendResults)
                runningOrder.push([new Element(-1, -1, null, null, "__SendResults__", {})]);

            if (conf_showOverview) {
                var l = $(document.createElement("ol"));
                for (var i = 0; i < runningOrder.length; ++i) {
                    var sl = $(document.createElement("ol"));
                    for (var j = 0; j < runningOrder[i].length; ++j) {
                        var li = $(document.createElement("li"));
                        var b = $(document.createElement("b"));
                        li.append(b.append(runningOrder[i][j]));
                        var hd = ibex_controller_get_property(runningOrder[i][j].controller, "htmlDescription") ? ibex_controller_get_property(runningOrder[i][j].controller, "htmlDescription")(runningOrder[i][j].options) : null;

                        if (hd) li.append(": ").append($(hd));
                        sl.append(li);
                    }
                    l.append($(document.createElement("li")).append(sl));
                }
                inner.append(l);
            } else {

                function Utils(valuesFromPreviousElement) {
                    this.timeoutIds = [];

                    this.setTimeout = function (func, time) {
                        var id = setTimeout(func, time);
                        this.timeoutIds.push(id);
                        return id;
                    }

                    this.clearTimeout = function (id) {
                        // Check that this is an id from a timeout set with the
                        // setTimeout method of this object.
                        // COMMENTING THIS CHECK OUT FOR PERFORMANCE REASONS.
                        /*var foundIt = false;
                        for (i = 0; i < this.timeoutIds; ++i) {
                            if (this.timeoutIds[i] == id) {
                                foundIt = this.timeoutIds[i];
                                break;
                            }
                        }
                        if (foundIt == null)
                            assert(false, "Attempt to clear timer that wasn't set propetly");
                        */

                        clearTimeout(id);

                        var newArray = [];
                        for (var j = 0; j < this.timeoutIds.length; ++j) {
                            if (this.timeoutIds[j] != id)
                                newArray.push(this.timeoutIds[j]);
                        }
                        this.timeoutIds = newArray;
                    }

                    this.gc = function () {
                        for (var i = 0; i < this.timeoutIds.length; ++i) {
                            clearTimeout(this.timeoutIds[i]);
                        }
                    }

                    this.valuesForNextElement = {};

                    this.setValueForNextElement = function (key, value) {
                        assert(typeof (key) == "string", "First argument to 'setValueForNextElement' must be a string");
                        this.valuesForNextElement[key] = value;
                    }

                    this.getValueFromPreviousElement = function (key) {
                        return valuesFromPreviousElement[key];
                    }

                    this.getValuesFromPreviousElement = function () {
                        return copy_dict(valuesFromPreviousElement);
                    }
                }

                var progressBarHeight;
                var progressBarMaxWidth;
                var currentProgressBarWidth = 0.0;
                var showProgress;
                var barContainer;
                var bar;
                var nPoints = 0;

                if (conf_showProgressBar) {
                    for (var i = 0; i < runningOrder.length; ++i) {
                        for (var j = 0; j < runningOrder[i].length; ++j) {
                            var currentElement = runningOrder[i][j];
                            if (!(currentElement.options.countsForProgressBar !== undefined && !currentElement.options.countsForProgressBar)) {
                                if (ibex_controller_get_property(currentElement.controller, "countsForProgressBar") === undefined ||
                                  ibex_controller_get_property(currentElement.controller, "countsForProgressBar")) {
                                    ++nPoints;
                                }
                            }
                        }
                    }

                    progressBarHeight = "0.8em";
                    progressBarMaxWidth = nPoints * 5 < 300 ? nPoints * 5 : 300;

                    var thingToPrependToBody;
                    if (conf_centerItems) {
                        thingToPrependToBody =
                          $(document.createElement("table"))
                            .attr('align', 'center')
                            .append($(document.createElement("tr"))
                              .append(showProgress = $(document.createElement("td"))));
                    } else {
                        thingToPrependToBody = showProgress =
                          $(document.createElement("div")).css('margin-top', '2em').addClass("lindent");
                    }

                    var bar;
                    barContainer =
                      $(document.createElement("div"))
                        .addClass("bar-container")
                        .css('height', progressBarHeight)
                        .css('width', progressBarMaxWidth)
                        .append(bar = $(document.createElement("div"))
                          .addClass("bar")
                          .css('height', progressBarHeight)
                          .css('width', 0));
                    var p =
                      $(document.createElement("p"))
                        .addClass("progress-text")
                        .css('text-align', conf_centerItems ? "center" : "left")
                        .text(conf_progressBarText);

                    showProgress.append("<div class='practice-instruction'  style='margin-top:100px'><a target='_blank' href='http://37.32.9.104/'>Open Instructions in New Tab</a></div>");

                    showProgress.append(barContainer).append(p);
                    $("body").prepend(thingToPrependToBody);
                }

                function updateProgressBar() {
                    if (conf_showProgressBar) {
                        currentProgressBarWidth += progressBarMaxWidth / nPoints;
                        bar.css('width', Math.round(currentProgressBarWidth) + "px");
                    }
                }

                function hideProgressBar() {
                    if (conf_showProgressBar) {
                        showProgress.css('visibility', "hidden");
                    }
                }

                function showProgressBar() {
                    if (conf_showProgressBar) {
                        showProgress.css('visibility', "visible");
                    }
                }

// Added by Sara - show instructions for the first practice question
// var p_instruction = $(document.createElement("div"))
                // .addClass("practice-instruction")
                // .css('text-align', conf_centerItems ? "left" : "right")
                // .text("Press the space bar to start reading! Each key press reveals the next word in the sentence.");
// $("body").append(p_instruction);

                var showInst = undefined;


                var posInRunningOrder = 0;
                var posInCurrentElementSet = 0;
                var currentUtilsInstance = null;
                var currentElementOptions = null;
// A list of result lines.
                var allResults = [];
// Array for column names.
                var columnNamesArray = ["Controller name", "Item number", "Element number", "Type", "Group"];

                function getColumnNameIndex(name) {
                    assert(typeof (name) == "string", "Internal error: 'getColumnNameIndex(...)'");
                    for (var i = 0; i < columnNamesArray.length; ++i) {
                        if (columnNamesArray[i] == name)
                            return i;
                    }
                    columnNamesArray.push(name);
                    return columnNamesArray.length - 1;
                }

                function namesToIndices(results_line) {
                    var na = [];
                    for (var i = 0; i < results_line.length; ++i) {
                        assert(results_line[i].length == 2, "Internal error");
                        na.push([getColumnNameIndex(results_line[i][0]), results_line[i][1]]);
                    }
                    return na;
                }

                function finishedCallback(resultsLines) {
                    var currentElement = runningOrder[posInRunningOrder][posInCurrentElementSet];

                    if (resultsLines != null && !currentElement.hideResults) {
                        for (var i = 0; i < resultsLines.length; ++i) {
                            var group = currentElement.group;
                            if (group && group.length)
                                group = group[0]
                            var preamble = [[0, currentElement.controller ? currentElement.controller : "UNKNOWN"],
                                [1, (currentElement.itemNumber || currentElement.itemNumber == 0) ? currentElement.itemNumber : "DYNAMIC"],
                                [2, (currentElement.elementNumber || currentElement.elementNumber == 0) ? currentElement.elementNumber : "DYNAMIC"],
                                [3, (currentElement.type || currentElement.type == 0) ? currentElement.type : "DYNAMIC"],
                                [4, (group == null) ? ((currentElement.itemNumber || currentElement.itemNumber == 0) ? "NULL" : "DYNAMIC") : group]];
                            resultsLines[i] = namesToIndices(resultsLines[i]);
                            for (var j = 0; j < resultsLines[i].length; ++j) {
                                preamble.push(resultsLines[i][j]);
                            }
                            allResults.push(preamble);
                        }
                    }

                    // Update progress bar if applicable.
                    if (!(currentElementOptions.countsForProgressBar !== undefined && !currentElementOptions.countsForProgressBar)) {
                        if (ibex_controller_get_property(currentElement.controller, "countsForProgressBar") === undefined ||
                          ibex_controller_get_property(currentElement.controller, "countsForProgressBar")) {
                            updateProgressBar();
                        }
                    }
                    // Added by Sara - show instructions for the first practice question
                    if (showInst === undefined) {
                        // showInst = 1;
                        var inst_box = $('.practice-instruction')
                        inst_box.css("visibility", "visible")

                    } else {
                        var inst_box = $('.practice-instruction')
                        inst_box.css("visibility", "hidden")
                    }
                    //


                    ++posInCurrentElementSet;
                    if (posInCurrentElementSet >= runningOrder[posInRunningOrder].length) {
                        ++posInRunningOrder;
                        if (posInRunningOrder >= runningOrder.length) {
                            // We've finished the experiment.
                            document.onkeydown = null; // Stop listening for keypresses.
                            return;
                        }
                        posInCurrentElementSet = 0;
                    }

                    currentElement = runningOrder[posInRunningOrder][posInCurrentElementSet];

                    var pForElement;
                    if (dget(currentElementOptions, "displayMode", "overwrite") != "append") {
                        renewInner();
                    }
                    pForElement = $(document.createElement("p")).css('clear', 'both');
                    inner.append(pForElement);
                    // Is this a practice item?
                    if (practiceBox) {
//        alert(currentItem.type + ":" + conf_practiceItemTypes);
                        if (list_contains(runningOrder[posInRunningOrder].type, conf_practiceItemTypes)) {
//            alert("PB2");
                            practiceBox.text(conf_practiceMessage);
                        } else {
                            practiceBox.text("");
                        }
                    }

                    currentUtilsInstance.gc();
                    currentUtilsInstance = new Utils(currentUtilsInstance.valuesForNextElement);
                    var os = currentElement.options;
                    os._finishedCallback = finishedCallback;
                    os._utils = currentUtilsInstance;
                    os._cssPrefix = ibex_controller_name_to_css_prefix(currentElement.controller);
                    os._controllerDefaults = ht_defaults;
                    os._utilsClass = Utils;
                    currentElementOptions = os;
                    addSafeBindMethodPair(currentElement.controller);
                    pForElement[currentElement.controller](os);

                    // Should we show the progress bar with this item?
                    if (currentElementOptions.hideProgressBar)
                        hideProgressBar();
                    else
                        showProgressBar();
                }

                var pForElement = $(document.createElement("p")).css('clear', 'both');
                inner.append(pForElement);
                currentUtilsInstance = new Utils({});
                var os = runningOrder[0][0].options;
                os._finishedCallback = finishedCallback;
                os._utils = currentUtilsInstance;
                os._cssPrefix = runningOrder[0][0].controller + "-";
                os._controllerDefaults = ht_defaults;
                os._utilsClass = Utils;
                currentElementOptions = os;
                addSafeBindMethodPair(runningOrder[0][0].controller);
                pForElement[runningOrder[0][0].controller](os);
// Should we show the progress bar with the first item?
                if (currentElementOptions.hideProgressBar)
                    hideProgressBar();

                function hopefullyUniqueMD5() {
                    var id = readCookie("ibex_random_id");
                    if (id) {
                        return id;
                    }
                    var s = '';
                    for (var i = 0; i < 20; ++i) {
                        // Don't use '\0' just in case it triggers some weird edge cases.
                        s += String.fromCharCode(1 + Math.random() * ((1 << 16) - 2));
                    }
                    var md5 = b64_md5(s);
                    createCookie("ibex_random_id", md5, 7);
                    return md5;
                }

// Make a post request to a given address. Address may either be a domain
// or an IP.
                function sendResults(resultsLines, success, failure) {
                    // Prepare the post data.
                    var data = JSON.stringify([false, // Now that we're not using cookies, it's never a random counter.
                        counter,
                        columnNamesArray,
                        resultsLines,
                        hopefullyUniqueMD5(),
                        !COUNTER_HAS_ALREADY_BEEN_UPDATED]);

                    $.ajax({
                        url: __server_py_script_name__,
                        cache: false,
                        contentType: "text/html; charset=UTF-8",
                        data: data,
                        type: "POST",
                        success: success,
                        error: failure
                    });
                }

            } // End of else for if (conf_showOverview).

        } // End function startup() {

        else throw "error"

    }).catch(err => alert("Failed to contact server"));
}


