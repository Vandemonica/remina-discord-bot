// ===================================================================
// ====================== Command Function ===========================
// ===================================================================

const search = require("search-this");


async function pfp(user) {
  if (user.avatar != null) {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=2048`;
  }

  return user.displayAvatarURL();
}


// ===========================================================================

async function doGoogle(interaction, text, site, ephemeral) {
  try {
    const response = await search(`${text}${site != null ? ' site:' + site : ''}`);

    await interaction.reply({ content: response.results[0].link, ephemeral: ephemeral });

    response.results.slice(1, 4).forEach(async (item) => {
      const context = { content: item.link, ephemeral: ephemeral };

      if (typeof interaction.followUp !== 'undefined') {
        await interaction.followUp(context);
      } else {
        await interaction.reply(context);
      }
    });

  } catch (error) {
    await interaction.reply("Couldn't reach Google API, please try again later");
  }
}


module.exports = {
  pfp, doGoogle
};
