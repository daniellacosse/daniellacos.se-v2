const CONTACT_CARD_ID = "ContactCard";
const CONTACT_CARD_CONTAINER_ID = `${CONTACT_CARD_ID}-container`;
const CONTACT_CARD_LINK_ID = `${CONTACT_CARD_ID}-link`;

const CONTACT_CARD_STYLE = {
  "align-items": "center",
  "background": "linear-gradient( -45deg, #18643f, #0d3622)",
  "border-radius": "20px",
  "color": "white",
  "display": "flex",
  "flex-direction": "column",
  "height": "120px",
  "padding": "20px 0",
  "justify-content": "space-around",
  "max-width": "280px",
  "position": "absolute",
  "top": "0",
  "transform": "translateY(-50%)",
  "transition": `top 500ms ${DASE_BEZIER}`,
  "transition-delay": DASE_DURATION,
  "width": "100%",
  "top": "calc(100% + 60px)",
};

const CONTACT_CARD_STYLE$OPEN = {
  ...CONTACT_CARD_STYLE,
  "top": "50%",
}

const CONTACT_CARD_STYLE$CLOSED = {
  ...CONTACT_CARD_STYLE,
  "top": "calc(100% + 60px)",
}

const CONTACT_CARD_CONTAINER_STYLE = {
  "background": "rgba(0, 0, 0, 0.5)",
  "display": "flex",
  "height": "100vh",
  "justify-content": "center",
  "left": "0",
  "opacity": "0",
  "padding": "20px",
  "pointer-events": "none",
  "position": "fixed",
  "top": "0",
  "transform": "rotate3d(0, 0, 0)",
  "transition": `opacity ${DASE_DURATION} ${DASE_BEZIER}`,
  "width": "100vw",
  "z-index": "20",
};

const CONTACT_CARD_CONTAINER_STYLE$VISIBLE = {
  ...CONTACT_CARD_CONTAINER_STYLE,
  "opacity": "1",
  "pointer-events": "all",
};

const CONTACT_CARD_LINK_STYLE = {
  "color": "white",
  "font-family": "nevis",
  "text-decoration": "none",
}

function openContactCard() {
  $changeElements({
    [CONTACT_CARD_ID]: {
      style: CONTACT_CARD_STYLE$OPEN
    },
    [CONTACT_CARD_CONTAINER_ID]: {
      style: CONTACT_CARD_CONTAINER_STYLE$VISIBLE
    }
  })
}

function closeContactCard() {
  $changeElements({
    [CONTACT_CARD_ID]: {
      style: CONTACT_CARD_STYLE$CLOSED
    },
    [CONTACT_CARD_CONTAINER_ID]: {
      style: CONTACT_CARD_CONTAINER_STYLE
    }
  })
}

function $renderContactCard() {
  const cardBody = $createElement({
    id: CONTACT_CARD_ID,
    style: CONTACT_CARD_STYLE,
    children: [
      $createElement({
        id: CONTACT_CARD_LINK_ID,
        name: "a",
        href: "mailto:d@niellacos.se",
        text: "D@nielLaCos.se",
        style: CONTACT_CARD_LINK_STYLE
      }),
      $createElement({
        id: CONTACT_CARD_LINK_ID + "-twitter",
        name: "a",
        target: "_blank",
        href: "https://twitter.com/daniellacosse",
        text: "@DanielLaCosse",
        style: CONTACT_CARD_LINK_STYLE
      })
    ]
  });

  return $createElement({
    id: CONTACT_CARD_CONTAINER_ID,
    style: CONTACT_CARD_CONTAINER_STYLE,
    children: [
      cardBody
    ],
    onClick: "closeContactCard()"
  })
}