import React, { Component } from "react";
import factory from "../etherium/factory"; // importing the factory instance to get the test deployed campaign
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";

class CampaignIndex extends Component {
  static async getInitialProps() {
    /**
     * static defines a 'class' function
     * We don't need to create an instance however
     *
     * Next.js replaces componentDidMount with this
     */
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
    /**
     * same as { campaigns: campaigns }
     * campaigns is now a prop!
     */
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: <a> View Campaign </a>,
        fluid: true,
      };
      /**
       * Set key names in Semantic UI library to create a Card Group / card list
       * Looping through each address to create a card
       * "fluid: true" -> every card will stretch the entire width of its container
       */
    });
    return <Card.Group items={items} />;
    /**
     * For r endering the items in to a list of cards
     */
  }

  render() {
    return (
      <Layout>
        <div>
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
          <h3>Open Campaigns!</h3>
          <Button
            floated="right"
            content="Create Campaign"
            icon="add circle"
            primary
          />
          {/**
           * primary -> adds some blue styling to the button :)
           */}
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
