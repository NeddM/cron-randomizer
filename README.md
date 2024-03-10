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

## Arguments:

- whichCron: This argument allows us to debug which cronjob we want to change, since we can have more than one in our workflow. Treat this as an array. 0 will be the first cronjob, 1 the second one, etc...

- whatToRandomize: In this argument we indicate which values we want to randomize. We will use the character "y" to indicate the ones we want to change, and "n" to indicate the ones we want to keep as they were in the original cronjob.
