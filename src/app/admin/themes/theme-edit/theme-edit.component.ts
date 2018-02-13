import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TdDialogService } from '@covalent/core/dialogs';
import { Theme } from '../../../models/themes/theme';
import { ThemeService } from '../../../models/themes/theme.service';
import { MessageService } from '../../../core/message.service';
import { Country } from '../../../models/countries/country';
import { CountryService } from '../../../models/countries/country.service';
import { Topic } from '../../../models/topics/topic';
import { TopicService } from '../../../models/topics/topic.service';

@Component({
  selector: 'ilr-theme-edit',
  templateUrl: './theme-edit.component.html',
  styleUrls: ['./theme-edit.component.scss'],
  providers: [TopicService, CountryService]
})
export class ThemeEditComponent implements OnInit {
  public form: FormGroup;
  public theme: Theme;
  public countries: Country[];
  public topics: Topic[];
  public editMode: boolean = true;
  public startDateMinDate: Date = new Date();
  public endDateMinDate: Date = new Date();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private dialogService: TdDialogService,
    private messageService: MessageService,
    private topicService: TopicService,
    private countryService: CountryService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param === 'new') {
      this.editMode = false;
    }

    this.route.data
      .subscribe((data: { theme: Theme }) => {
        this.theme = data.theme;
        this.createForm(this.theme);
    });

    this.getCountries();
    this.getTopics();
  }

  get startDate(): Date { return this.form.get('startDate').value as Date; }

  public getCountries(): void {
    this.countryService.getActive().subscribe(countries => this.countries = countries);
  }

  public getTopics(): void {
    this.topicService.fetch(['id', 'name']).subscribe(topics => this.topics = topics);
  }

  public cancel(): void {
    this.goBack();
  }

  private createForm(theme: Theme): void {
    this.form = this.fb.group({
      id: theme.id,
      name: [theme.name, [Validators.required]],
      country: theme.country || [],
      topics: theme.topics || [],
      startDate: theme.startDate,
      endDate: theme.endDate
    });
  }

  public save(theme: Theme): void {
    this.messageService.saving();
    if (this.editMode) {
      this.updateTheme(theme);
    } else {
      this.createTheme(theme);
    }
  }

  private createTheme(theme: Theme): void {
    this.themeService.create(theme)
      .subscribe(
        () => {
          this.messageService.saveComplete();
          this.form.markAsPristine();
          this.goBack();
        });
  }

  private updateTheme(theme: Theme): void {
    this.themeService.update(theme)
      .subscribe(
        () => {
          this.messageService.saveComplete();
          this.form.markAsPristine();
          this.goBack();
        });
  }

  private goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
