//customer management: loads the member list from json and shows the record picked with ?id= in the url
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

//read ?id= from the url, e.g. management.html?id=3 gives 3 (no id means member 1)
const getSelectedId = () => {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id")) || 1;
};

//one sidebar entry: avatar, name, and plan, linking to that member's record
const getMemberItem = (member, isActive) => {
    const item = document.createElement("a");
    item.className = "member-item";
    if (isActive) {
        item.classList.add("member-item-active");
    }
    item.href = "management.html?id=" + member._id;

    const img = document.createElement("img");
    img.className = "member-avatar";
    img.src = member.img_name;
    img.alt = "";
    item.append(img);

    const text = document.createElement("span");
    text.append(member.name);
    text.append(document.createElement("br"));
    const plan = document.createElement("small");
    plan.textContent = member.plan;
    text.append(plan);
    item.append(text);

    return item;
};

//fill the record panel's empty slots with one member's details
const showMemberDetail = (member) => {
    document.title = "Cano Tech - " + member.name;

    const avatar = document.getElementById("detail-avatar");
    avatar.src = member.img_name;
    avatar.alt = member.name;

    document.getElementById("detail-name").textContent = member.name;
    document.getElementById("detail-sub").textContent =
        member.member_id + " · " + member.email + " · " + member.phone + " · Since " + member.member_since;

    const status = document.getElementById("detail-status");
    status.textContent = member.status;
    status.className = "status status-" + member.status.toLowerCase();

    document.getElementById("detail-plan").textContent = member.plan;
    document.getElementById("detail-full-name").textContent = member.name;
    document.getElementById("detail-email").textContent = member.email;
    document.getElementById("detail-phone").textContent = member.phone;
    document.getElementById("detail-since").textContent = member.member_since;
    document.getElementById("detail-visits").textContent = member.visits_per_week;
    document.getElementById("detail-logged").textContent = member.logged_visits;
    document.getElementById("detail-last-visit").textContent = member.last_visit;
    document.getElementById("detail-benefits").textContent = member.benefits.join(", ");
};

const showManagement = async () => {
    const listBox = document.getElementById("member-list-items");
    const members = await getMembers();

    if (members == null) {
        listBox.innerHTML = '<p class="member-message">Couldn\'t load members.</p>';
        document.getElementById("member-detail").innerHTML =
            '<p class="member-message">Sorry, we couldn\'t load this member record. Please try again later.</p>';
        return;
    }

    //fall back to the first member if the id in the url doesn't match anyone
    const selectedId = getSelectedId();
    const selected = members.find((member) => member._id === selectedId) || members[0];

    listBox.innerHTML = "";
    members.forEach((member) => {
        listBox.append(getMemberItem(member, member._id === selected._id));
    });

    showMemberDetail(selected);
};

showManagement();
