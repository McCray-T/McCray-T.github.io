//customer directory: loads the member list from json and builds one row per member
const membersUrl = "https://mccray-t.github.io/csce242/projects/part7/json/members.json";

const getMembers = async () => {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) {
            throw new Error("Request failed with status " + response.status);
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
};

//small helper so each cell is one line below
const makeSpan = (text, className) => {
    const span = document.createElement("span");
    span.textContent = text;
    if (className) {
        span.className = className;
    }
    return span;
};

const getMemberRow = (member) => {
    //each row links to that member's record on the management page
    const row = document.createElement("a");
    row.className = "member-row member-row-link";
    row.href = "management.html?id=" + member._id;

    //avatar, name, and member id
    const nameCell = document.createElement("span");
    nameCell.className = "member-name";

    const img = document.createElement("img");
    img.className = "member-avatar";
    img.src = member.img_name;
    img.alt = "";
    nameCell.append(img);

    const nameText = document.createElement("span");
    nameText.append(member.name);
    nameText.append(document.createElement("br"));
    const id = document.createElement("small");
    id.textContent = member.member_id;
    nameText.append(id);
    nameCell.append(nameText);

    row.append(nameCell);
    row.append(makeSpan(member.plan));
    row.append(makeSpan(member.visits_per_week + "x"));
    row.append(makeSpan(member.benefits.join(", ")));
    row.append(makeSpan(member.last_visit));
    row.append(makeSpan(member.status, "status status-" + member.status.toLowerCase()));

    return row;
};

const showMembers = async () => {
    const rowsBox = document.getElementById("member-rows");
    const members = await getMembers();

    if (members == null) {
        rowsBox.innerHTML = '<p class="member-message">Sorry, we couldn\'t load the member list. Please try again later.</p>';
        return;
    }

    rowsBox.innerHTML = "";
    members.forEach((member) => {
        rowsBox.append(getMemberRow(member));
    });
};

showMembers();
