# <%= name %> modular resource

This module implements the [<%= api_namespace %> <%= api_name_lower %> API](https://github.com/<%= api_namespace %>/<%= api_name_lower %>-api) in a <%= model %> model.
With this model, you can...

## Requirements

_Add instructions here for any requirements._

``` bash
```

## Build and run

To use this module, follow the instructions to [add a module from the Viam Registry](https://docs.viam.com/registry/configure/#add-a-modular-resource-from-the-viam-registry) and select the `<%= api_namespace %>:<%= api_name_lower %>:<%= model %>` model from the [`<%= model %>` module](https://app.viam.com/module/<%= api_namespace %>/<%= model %>).

## Configure your <%= api_name_lower %>

> [!NOTE]  
> Before configuring your <%= api_name_lower %>, you must [create a machine](https://docs.viam.com/manage/fleet/machines/#add-a-new-machine).

Navigate to the **Config** tab of your machine's page in [the Viam app](https://app.viam.com/).
Click on the **Components** subtab and click **Create component**.
Select the `<%= api_name_lower %>` type, then select the `<%= model %>` model. 
Click **Add module**, then enter a name for your <%= api_name_lower %> and click **Create**.

On the new component panel, copy and paste the following attribute template into your <%= api_name_lower %>’s **Attributes** box:

```json
{
  TODO: INSERT SAMPLE ATTRIBUTES
}
```

> [!NOTE]  
> For more information, see [Configure a Machine](https://docs.viam.com/manage/configuration/).

### Attributes

The following attributes are available for `<%= api_namespace %>:<%= api_name_lower %>:<%= model %>` <%= api_name_lower %>s:

| Name | Type | Inclusion | Description |
| ---- | ---- | --------- | ----------- |
| `todo1` | string | **Required** |  TODO |
| `todo2` | string | Optional |  TODO |

### Example configuration

```json
{
  TODO: INSERT SAMPLE CONFIGURATION(S)
}
```

### Next steps

_Add any additional information you want readers to know and direct them towards what to do next with this module._
_For example:_ 

- To test your...
- To write code against your...

## Troubleshooting

_Add troubleshooting notes here._
