# <%= name %> modular service

This module implements the [<%= api_namespace %> <%= api_name_lower %> API](https://github.com/<%= api_namespace %>/<%= api_name_lower %>-api) in a <%= model %> model.
With this model, you can...

## Requirements

Add instructions here for any requirements.

``` bash
```

## Build and Run

To use this module, follow these instructions to [add a module from the Viam Registry](https://docs.viam.com/registry/configure/#add-a-modular-resource-from-the-viam-registry) and select the `<%= api_namespace %>:<%= api_name_lower %>:<%= model %>` model from the [`<%= model %>` module](https://app.viam.com/module/<%= api_namespace %>/<%= model %>).

## Configure your <%= api_name_lower %>

> [!NOTE]  
> Before configuring your <%= api_name_lower %>, you must [create a robot](https://docs.viam.com/manage/fleet/robots/#add-a-new-robot).

Navigate to the **Config** tab of your robot’s page in [the Viam app](https://app.viam.com/).
Click on the **Components** subtab and click **Create component**.
Select the `<%= api_name_lower %>` type, then select the `<%= model %>` model. 
Enter a name for your <%= api_name_lower %> and click **Create**.

On the new component panel, copy and paste the following attribute template into your <%= api_name_lower %>’s **Attributes** box:

```json
{
  <INSERT SAMPLE ATTRIBUTES>
}
```

> [!NOTE]  
> For more information, see [Configure a Robot](https://docs.viam.com/manage/configuration/).

### Attributes

The following attributes are available for `<%= api_namespace %>:<%= api_name_lower %>:<%= model %>` <%= api_name_lower %>s:

| Name | Type | Inclusion | Description |
| ---- | ---- | --------- | ----------- |
| `` | string | **Required** |  |
| `` | string | Optional |  |

### Example Configuration

```json
{
  <INSERT SAMPLE CONFIGURATION(S)>
}
```

### Next Steps

Add any additional information you want them to know and direct them towards what to do next with Viam.
For example: 

- To test your...
- To write code against your...

## Troubleshooting

Add troubleshooting notes here.
