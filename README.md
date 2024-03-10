# cron-randomizer

This action allows us to randomize our cronjobs.

It is very useful when, for example, we want a workflow to run every day, but at different hours and minutes.

So far there is no function that allows us to do this in Github Actions.

Then you will have to push the changes to your repository, but that is no longer the task of the action. That must be done in separate steps.


## Usage


```yaml
- name: Randomize cronjobs
  uses: NeddM/cron-randomizer@v1
  with:
    whichCron: 0
    whatToRandomize: "y y n n n"
```
